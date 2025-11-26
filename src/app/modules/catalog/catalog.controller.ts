import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { CatalogService } from './catalog.service';

const createCatalog = catchAsync(async (req, res) => {
     const id = (req?.user as any)?.id;
     const result = await CatalogService.createCompleteCatalogToDB(id, req.body);
     sendResponse(res, {
          success: true,
          statusCode: StatusCodes.OK,
          message: 'Catalog created successfully',
          data: result,
     });
});
const getCatalog = catchAsync(async (req, res) => {
     const id = (req?.user as any)?.id;
     const result = await CatalogService.getCatalogByIdFromDB(id, req.params.id);
     sendResponse(res, {
          success: true,
          statusCode: StatusCodes.OK,
          message: 'Catalog retrieved successfully',
          data: result,
     });
});
const getCatalogs = catchAsync(async (req, res) => {
     const result = await CatalogService.getAllCatalogsFromDB(req.query);
     sendResponse(res, {
          success: true,
          statusCode: StatusCodes.OK,
          message: 'Catalog retrieved successfully',
          data: result,
     });
});
const getCatalogsByUserId = catchAsync(async (req, res) => {
     const id = (req?.user as any)?.id;
     const result = await CatalogService.getArtistCatalogsFromDB(id, req.query);
     sendResponse(res, {
          success: true,
          statusCode: StatusCodes.OK,
          message: 'Catalog retrieved successfully',
          data: result,
     });
});
const getCatalogById = catchAsync(async (req, res) => {
     const id = (req?.user as any)?.id;
     const result = await CatalogService.getCatalogDetailsFromDB(req.params.id);
     sendResponse(res, {
          success: true,
          statusCode: StatusCodes.OK,
          message: 'Catalog retrieved successfully',
          data: result,
     });
});
const updateCatalogStatus = catchAsync(async (req, res) => {
     const id = (req?.user as any)?.id;
     const result = await CatalogService.updateCatalogToDB(req.params.id, id, req.body);
     sendResponse(res, {
          success: true,
          statusCode: StatusCodes.OK,
          message: 'Catalog retrieved successfully',
          data: result,
     });
});
const deleteCatalog = catchAsync(async (req, res) => {
     const id = (req?.user as any)?.id;
     const result = await CatalogService.deleteCatalogFromDB(req.params.id, id);
     sendResponse(res, {
          success: true,
          statusCode: StatusCodes.OK,
          message: 'Catalog retrieved successfully',
          data: result,
     });
});
export const CatalogController = {
     createCatalog,
     getCatalog,
     getCatalogs,
     getCatalogsByUserId,
     updateCatalogStatus,
     getCatalogById,deleteCatalog
};
