import { StatusCodes } from 'http-status-codes';
import { Catalog } from './catalog.model';
import { IUpdateCatalogStatus } from './catalog.interface';
import { User } from '../user/user.model';
import { Artist } from '../artist/artist.model';
import AppError from '../../../errors/AppError';
import QueryBuilder from '../../builder/QueryBuilder';

// Create complete catalog
const createCompleteCatalogToDB = async (userId: string, data: any) => {
     const user = await User.findById(userId);
     if (!user || user.role !== 'ARTIST') {
          throw new AppError(StatusCodes.FORBIDDEN, 'Only artists can create catalogs');
     }

     const catalog = await Catalog.create({
          userId,
          ...data,
          status: 'PENDING',
     });
     return {
          success: true,
          message: 'Catalog created and submitted for review',
          data: catalog,
     };
};

// Get catalog by ID
const getCatalogByIdFromDB = async (catalogId: string, userId?: string) => {
     const catalog = await Catalog.findById(catalogId);
     const artistInfo = await Artist.findOne({ userId: catalog?.userId });
     if (!catalog) {
          throw new AppError(StatusCodes.NOT_FOUND, 'Catalog not found');
     }
     if (catalog.status !== 'APPROVED') {
          const user = userId ? await User.findById(userId) : null;
          const isOwner = catalog.userId.toString() === userId;
          const isAdmin = user?.role === 'ADMIN';

          if (!isOwner && !isAdmin) {
               throw new AppError(StatusCodes.NOT_FOUND, 'Catalog not found');
          }
     }

     return { success: true, data: { catalog, artistInfo } };
};

// Get all catalogs
const getAllCatalogsFromDB = async (query: any = {}) => {
     const catalog = new QueryBuilder(Catalog.find(), { ...query, isDeleted: false, status: 'APPROVED' }).priceRange().filter().sort().paginate();
     const result = await catalog.modelQuery;
     const meta = await catalog.countTotal();

     return { meta, result };
};

// Get artist catalogs
const getArtistCatalogsFromDB = async (userId: string, query: any = {}) => {
     const catalog = new QueryBuilder(Catalog.find(), { ...query, isDeleted: false, userId }).search(['title', 'primaryArtist', 'language', 'releaseYear']).filter().sort().paginate();
     const result = await catalog.modelQuery;
     const meta = await catalog.countTotal();

     return { meta, result };
};

// Update catalog status
const updateCatalogStatusToDB = async (catalogId: string, data: IUpdateCatalogStatus) => {
     const catalog = await Catalog.findById(catalogId);
     if (!catalog) {
          throw new AppError(StatusCodes.NOT_FOUND, 'Catalog not found');
     }

     catalog.status = data.status;
     await catalog.save();

     return catalog;
};

// Update catalog
const updateCatalogToDB = async (catalogId: string, userId: string, data: any) => {
     // First, fetch catalog to apply business rules
     const catalog = await Catalog.findOne({ _id: catalogId, userId,isDeleted:false });
     if (!catalog) {
          throw new AppError(StatusCodes.NOT_FOUND, 'Catalog not found or unauthorized');
     }

     // If OK, update using findOneAndUpdate
     const updatedCatalog = await Catalog.findOneAndUpdate({ _id: catalogId, userId }, { $set: data }, { new: true, runValidators: true });

     return updatedCatalog;
};

// Delete catalog
const deleteCatalogFromDB = async (catalogId: string, userId: string) => {
     const catalog = await Catalog.findOne({ _id: catalogId, userId });
     if (!catalog) {
          throw new AppError(StatusCodes.NOT_FOUND, 'Catalog not found or unauthorized');
     }
     if (catalog.status === 'APPROVED') {
          throw new AppError(StatusCodes.BAD_REQUEST, 'Cannot delete approved catalog with investments');
     }
     await catalog.deleteOne();
     return {
          success: true,
          message: 'Catalog deleted successfully',
     };
};

// Get catalog details
const getCatalogDetailsFromDB = async (catalogId: string) => {
     const catalog = await Catalog.findById(catalogId);
     const artist = await Artist.findOne({userId:catalog?.userId})

     if (!catalog) {
          throw new AppError(StatusCodes.NOT_FOUND, 'Catalog not found');
     }
     return {
          success: true,
          data: { catalog ,artist},
     };
};

export const CatalogService = {
     createCompleteCatalogToDB,
     getCatalogByIdFromDB,
     getAllCatalogsFromDB,
     getArtistCatalogsFromDB,
     updateCatalogStatusToDB,
     updateCatalogToDB,
     deleteCatalogFromDB,
     getCatalogDetailsFromDB,
};
