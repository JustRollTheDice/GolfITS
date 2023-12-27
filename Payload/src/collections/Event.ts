import { CollectionConfig } from 'payload/types';

const Event: CollectionConfig = {
  slug: 'event',
  auth: false,
  admin: {
    useAsTitle: 'Event',
  },
  access: {
    create: () => true,
    read: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: 'eventImage',
      label: 'Event Image',
      type: 'upload',
      relationTo: 'eventimages',
    },
    {
      name: 'event',
      label: 'Event',
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
      name: 'eventDate',
      label: 'Event Date',
      type: 'date',
      required: true,
    },
    {
      name: 'category',
      label: 'Category',
      type: 'select',
      options: [
        { label: 'Kompetisi', value: 'Kompetisi' },
      ],
    },
    {
      name: 'author',
      label: 'Author',
      type: 'relationship',
      relationTo: 'staffs', 
    },
    {
      name: 'body',
      label: 'Body',
      type: 'richText',
    },
    {
      name: 'tags',
      label: 'Tags',
      type: 'text',
    },
  ],
};

export default Event;
