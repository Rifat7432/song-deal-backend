import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { CatalogService } from './catalog.service';
import config from '../../../config';
import bcrypt from 'bcrypt';

const createCatalog = catchAsync(async (req, res) => {
     const { ...catalogData } = req.body;
     const result = await CatalogService.createCatalogToDB(catalogData);
     sendResponse(res, {
          success: true,
          statusCode: StatusCodes.OK,
          message: 'Investor Account Catalog created successfully',
          data: result,
     });
});


export const CatalogController = {
     createCatalog,

}