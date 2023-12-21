import { CollectionConfig } from 'payload/types';
import Teams from './Teams';

const Members: CollectionConfig = {
  slug: 'members',
  auth: true,
  admin: {
    useAsTitle: 'username',
  },
  access: {
    create: () => true,
    read: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: 'nrp',
      label: 'NRP',
      type: 'text',
      required: true,
    },
    {
      name: 'name',
      label: 'Name',
      type: 'text',
      required: true,
    },
    {
      name: 'nickname',
      label: 'Nickname',
      type: 'text',
      required: true,
    },
    {
      name: 'profilePicture',
      label: 'Profile Picture',
      type: 'upload',
      relationTo: 'memberimages', // Sesuaikan dengan slug koleksi 'Media'
    },
    {
      name: 'team',
      label: 'Team',
      type: 'relationship',
      relationTo: 'teams',
      hasMany: false,
      required: true,
    },
    {
      name: 'major',
      label: 'Major',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      required: true,
    },
    {
      name: 'phoneNumber',
      label: 'Phone Number',
      type: 'text',
      required: true,
    },
    {
      name: 'attendance',
      label: 'Attendance',
      type: 'relationship',
      relationTo: 'sessions',
      hasMany: true,
    },
  ],
};

export default Members;