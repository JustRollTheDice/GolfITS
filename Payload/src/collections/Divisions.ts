import { CollectionConfig } from 'payload/types';

const Divisions: CollectionConfig = {
  slug: 'divisions',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    create: () => true,
    read: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: 'name',
      label: 'Division Name',
      type: 'text',
      required: true,
    },
  ],
};

export default Divisions;
