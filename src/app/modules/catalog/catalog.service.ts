import { StatusCodes } from 'http-status-codes';
import { Catalog } from './catalog.model';
import {IUpdateCatalogStatus } from './catalog.interface';
import { User } from '../user/user.model';
import { Artist } from '../artist/artist.model';
import AppError from '../../../errors/AppError';

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

     await Artist.findOneAndUpdate({ userId }, { $inc: { totalCatalogs: 1 } });

     return {
          success: true,
          message: 'Catalog created and submitted for review',
          data: { catalog },
     };
};

// Get catalog by ID
const getCatalogByIdFromDB = async (catalogId: string, userId?: string) => {
     const catalog = await Catalog.findById(catalogId).populate('userId', 'email role');

     if (!catalog) {
          throw new AppError(StatusCodes.NOT_FOUND, 'Catalog not found');
     }

     if (catalog.status !== 'APPROVED') {
          const user = userId ? await User.findById(userId) : null;
          const isOwner = catalog.userId._id.toString() === userId;
          const isAdmin = user?.role === 'ADMIN';

          if (!isOwner && !isAdmin) {
               throw new AppError(StatusCodes.NOT_FOUND, 'Catalog not found');
          }
     }

     return { success: true, data: { catalog } };
};

// Get all catalogs
const getAllCatalogsFromDB = async (query: any = {}) => {
     const { page = 1, limit = 10, status, genre, artist, region, search, userId } = query;

     const filter: any = {};

     if (userId) {
          filter.userId = userId;
     } else {
          filter.status = 'APPROVED';
     }

     if (status && userId) filter.status = status;
     if (genre) filter.genre = genre;
     if (artist) filter.primaryArtist = new RegExp(artist, 'i');
     if (search) filter.$text = { $search: search };

     const skip = (page - 1) * limit;

     const [catalogs, total] = await Promise.all([Catalog.find(filter).populate('userId', 'email').skip(skip).limit(Number(limit)).sort({ createdAt: -1 }), Catalog.countDocuments(filter)]);

     return {
          success: true,
          data: {
               catalogs,
               pagination: {
                    page: Number(page),
                    limit: Number(limit),
                    total,
                    pages: Math.ceil(total / limit),
               },
          },
     };
};

// Get artist catalogs
const getArtistCatalogsFromDB = async (userId: string, query: any = {}) => {
     const { status, page = 1, limit = 10 } = query;

     const filter: any = { userId };
     if (status) filter.status = status;

     const skip = (page - 1) * limit;

     const [catalogs, total] = await Promise.all([Catalog.find(filter).skip(skip).limit(Number(limit)).sort({ createdAt: -1 }), Catalog.countDocuments(filter)]);

     const catalogsWithProgress = catalogs.map((catalog) => ({
          ...catalog.toObject(),
          fundingProgress: 0,
     }));

     return {
          success: true,
          data: {
               catalogs: catalogsWithProgress,
               pagination: {
                    page: Number(page),
                    limit: Number(limit),
                    total,
                    pages: Math.ceil(total / limit),
               },
          },
     };
};

// Update catalog status
const updateCatalogStatusToDB = async (catalogId: string, data: IUpdateCatalogStatus) => {
     const catalog = await Catalog.findById(catalogId);
     if (!catalog) {
          throw new AppError(StatusCodes.NOT_FOUND, 'Catalog not found');
     }

     catalog.status = data.status;
     await catalog.save();

     return {
          success: true,
          message: `Catalog ${data.status.toLowerCase()} successfully`,
          data: { catalog },
     };
};

// Update catalog
const updateCatalogToDB = async (catalogId: string, userId: string, data: any) => {
     const catalog = await Catalog.findOne({ _id: catalogId, userId });
     if (!catalog) {
          throw new AppError(StatusCodes.NOT_FOUND, 'Catalog not found or unauthorized');
     }

     if (catalog.status === 'APPROVED') {
          throw new AppError(StatusCodes.BAD_REQUEST, 'Cannot update approved catalog');
     }

     Object.assign(catalog, data);
     await catalog.save();

     return {
          success: true,
          message: 'Catalog updated successfully',
          data: { catalog },
     };
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

     await Artist.findOneAndUpdate({ userId }, { $inc: { totalCatalogs: -1 } });

     return {
          success: true,
          message: 'Catalog deleted successfully',
     };
};

// Get catalog details
const getCatalogDetailsFromDB = async (catalogId: string) => {
     const catalog = await Catalog.findById(catalogId).populate('userId', 'email role');

     if (!catalog) {
          throw new AppError(StatusCodes.NOT_FOUND, 'Catalog not found');
     }

     const investmentSummary = {
          currentFunding: 0,
          fundingPercentage: 0,
          numberOfInvestors: 0,
     };

     return {
          success: true,
          data: { catalog, investmentSummary },
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
