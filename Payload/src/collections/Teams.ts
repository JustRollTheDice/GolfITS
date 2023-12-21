import { CollectionConfig } from 'payload/types';
import Staffs from './Staffs';

const Teams: CollectionConfig = {
  slug: 'teams',
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
      label: 'Team Name',
      type: 'text',
      required: true,
    },
    {
      name: 'group',
      label: 'Group',
      type: 'radio',
      options: [
        { label: 'Group A', value: 'A' },
        { label: 'Group B', value: 'B' },
        { label: 'Group C', value: 'C' },
      ],
      required: true,
    },
    {
        name: 'staff',
        label: 'Handler',
        type: 'relationship',
        relationTo: 'staffs',
        hasMany: false,
        required: true
    },
  ],
};

export default Teams;
