import { CollectionConfig } from 'payload/types';

const Apparel: CollectionConfig = {
  slug: 'apparel',
  auth: false,
  admin: {
    useAsTitle: 'Product',
  },
  access: {
    create: () => true,
    read: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: 'apparelImage',
      label: 'Apparel Image',
      type: 'upload',
      relationTo: 'apparelimages',
    },
    {
      name: 'apparel',
      label: 'Apparel',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      label: 'Description',
      type: 'text',
      required: true,
    },
    {
        name: 'price',
        label: 'Price',
        type: 'text',
        required: true,
    },
  ],
};

export default Apparel;