"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CatalogService = void 0;
const http_status_codes_1 = require("http-status-codes");
const catalog_model_1 = require("./catalog.model");
const user_model_1 = require("../user/user.model");
const artist_model_1 = require("../artist/artist.model");
const AppError_1 = __importDefault(require("../../../errors/AppError"));
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
// Create complete catalog
const createCompleteCatalogToDB = (userId, data) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findById(userId);
    if (!user || user.role !== 'ARTIST') {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.FORBIDDEN, 'Only artists can create catalogs');
    }
    const catalog = yield catalog_model_1.Catalog.create(Object.assign(Object.assign({ userId }, data), { status: 'PENDING' }));
    return {
        success: true,
        message: 'Catalog created and submitted for review',
        data: catalog,
    };
});
// Get catalog by ID
const getCatalogByIdFromDB = (catalogId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const catalog = yield catalog_model_1.Catalog.findById(catalogId);
    const artistInfo = yield artist_model_1.Artist.findOne({ userId: catalog === null || catalog === void 0 ? void 0 : catalog.userId });
    if (!catalog) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Catalog not found');
    }
    if (catalog.status !== 'APPROVED') {
        const user = userId ? yield user_model_1.User.findById(userId) : null;
        const isOwner = catalog.userId.toString() === userId;
        const isAdmin = (user === null || user === void 0 ? void 0 : user.role) === 'ADMIN';
        if (!isOwner && !isAdmin) {
            throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Catalog not found');
        }
    }
    return { success: true, data: { catalog, artistInfo } };
});
// Get all catalogs
const getAllCatalogsFromDB = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (query = {}) {
    const catalog = new QueryBuilder_1.default(catalog_model_1.Catalog.find(), Object.assign(Object.assign({}, query), { isDeleted: false, status: 'APPROVED' })).priceRange().filter().sort().paginate();
    const result = yield catalog.modelQuery;
    const meta = yield catalog.countTotal();
    return { meta, result };
});
// Get artist catalogs
const getArtistCatalogsFromDB = (userId_1, ...args_1) => __awaiter(void 0, [userId_1, ...args_1], void 0, function* (userId, query = {}) {
    const catalog = new QueryBuilder_1.default(catalog_model_1.Catalog.find(), Object.assign(Object.assign({}, query), { isDeleted: false, userId })).search(['title', 'primaryArtist', 'language', 'releaseYear']).filter().sort().paginate();
    const result = yield catalog.modelQuery;
    const meta = yield catalog.countTotal();
    return { meta, result };
});
// Update catalog status
const updateCatalogStatusToDB = (catalogId, data) => __awaiter(void 0, void 0, void 0, function* () {
    const catalog = yield catalog_model_1.Catalog.findById(catalogId);
    if (!catalog) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Catalog not found');
    }
    catalog.status = data.status;
    yield catalog.save();
    return catalog;
});
// Update catalog
const updateCatalogToDB = (catalogId, userId, data) => __awaiter(void 0, void 0, void 0, function* () {
    // First, fetch catalog to apply business rules
    const catalog = yield catalog_model_1.Catalog.findOne({ _id: catalogId, userId, isDeleted: false });
    if (!catalog) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Catalog not found or unauthorized');
    }
    // If OK, update using findOneAndUpdate
    const updatedCatalog = yield catalog_model_1.Catalog.findOneAndUpdate({ _id: catalogId, userId }, { $set: data }, { new: true, runValidators: true });
    return updatedCatalog;
});
// Delete catalog
const deleteCatalogFromDB = (catalogId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const catalog = yield catalog_model_1.Catalog.findOne({ _id: catalogId, userId });
    if (!catalog) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Catalog not found or unauthorized');
    }
    if (catalog.status === 'APPROVED') {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'Cannot delete approved catalog with investments');
    }
    yield catalog.deleteOne();
    return {
        success: true,
        message: 'Catalog deleted successfully',
    };
});
// Get catalog details
const getCatalogDetailsFromDB = (catalogId) => __awaiter(void 0, void 0, void 0, function* () {
    const catalog = yield catalog_model_1.Catalog.findById(catalogId);
    const artist = yield artist_model_1.Artist.findOne({ userId: catalog === null || catalog === void 0 ? void 0 : catalog.userId });
    if (!catalog) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Catalog not found');
    }
    return {
        success: true,
        data: { catalog, artist },
    };
});
exports.CatalogService = {
    createCompleteCatalogToDB,
    getCatalogByIdFromDB,
    getAllCatalogsFromDB,
    getArtistCatalogsFromDB,
    updateCatalogStatusToDB,
    updateCatalogToDB,
    deleteCatalogFromDB,
    getCatalogDetailsFromDB,
};
