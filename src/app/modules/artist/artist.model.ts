import { model, Schema } from 'mongoose';

const PortfolioLinksSchema = new Schema(
     {
          spotify: { type: String, default: '' },
          youtube: { type: String, default: '' },
          audioMack: { type: String, default: '' },
          soundCloud: { type: String, default: '' },
     },
     { _id: false },
);

const SocialMediasSchema = new Schema(
     {
          facebook: { type: String, default: '' },
          twitter: { type: String, default: '' },
          instagram: { type: String, default: '' },
          linkedin: { type: String, default: '' },
          tiktok: { type: String, default: '' },
          soundCloud: { type: String, default: '' },
     },
     { _id: false },
);

const ArtistSchema = new Schema(
     {
          fullname: { type: String, required: true },
          email: { type: String, required: true, unique: true },
          phoneNumber: { type: String, required: true },
          country: { type: String, required: true },
          city: { type: String, required: true },
          bio: { type: String, default: '' },
          profilePicture: { type: String, default: '' },
          coverImage: { type: String, default: '' },
          genres: { type: String, default: '' },
          portfolioLinks: { type: PortfolioLinksSchema, default: {} },
          socialMedias: { type: SocialMediasSchema, default: {} },
          userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
     },
     {
          timestamps: true, // This automatically adds createdAt and updatedAt
     },
);

export const Artist = model('Artist', ArtistSchema);
