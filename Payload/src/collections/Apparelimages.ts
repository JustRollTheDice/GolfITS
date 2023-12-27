import { CollectionConfig } from 'payload/types'

const Apparelimages: CollectionConfig = {
  slug: 'apparelimages',
  access: {
    create: () => true,
    read: () => true,
    update: () => true,
    delete: () => true,
  },
  upload: {
    staticURL: '/apparel-images',
    staticDir: 'apparel-images',
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

export default Apparelimages;