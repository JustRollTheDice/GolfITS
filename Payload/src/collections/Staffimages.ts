import { CollectionConfig } from 'payload/types'

const Staffimages: CollectionConfig = {
  slug: 'staffimages',
  access: {
    create: () => true,
    read: () => true,
    update: () => true,
    delete: () => true,
  },
  upload: {
    staticURL: '/staff-images',
    staticDir: 'staff-images',
    adminThumbnail: 'thumbnail',
    mimeTypes: ['image/*'],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
    },
  ],
};

export default Staffimages;