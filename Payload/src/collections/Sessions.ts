import { CollectionConfig } from 'payload/types';

const Sessions: CollectionConfig = {
  slug: 'sessions',
  admin: {
    useAsTitle: 'sessionNumber',
  },
  access: {
    create: () => true,
    read: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: 'sessionNumber',
      label: 'Session Number',
      type: 'text',
      required: true,
    },
    {
      name: 'date',
      label: 'Date',
      type: 'date',
      required: true,
    },
    {
      name: 'sessionType',
      label: 'Session Type',
      type: 'select',
      options: [
        { label: 'Morning', value: 'morning' },
        { label: 'Afternoon', value: 'afternoon' },
      ],
      required: true,
    },
  ],
};

export default Sessions;