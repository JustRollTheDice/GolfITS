import { CollectionConfig } from 'payload/types'

const Eventimages: CollectionConfig = {
  slug: 'eventimages',
  access: {
    create: () => true,
    read: () => true,
    update: () => true,
    delete: () => true,
  },
  upload: {
    staticURL: '/event-images',
    staticDir: 'event-images',
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

export default Eventimages;