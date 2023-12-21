import path from 'path'

import { payloadCloud } from '@payloadcms/plugin-cloud'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { webpackBundler } from '@payloadcms/bundler-webpack'
import { slateEditor } from '@payloadcms/richtext-slate'
import { buildConfig } from 'payload/config'

import Users from './collections/Users'
import Members from './collections/Members'
import Divisions from './collections/Divisions'
import Staffs from './collections/Staffs'
import Teams from './collections/Teams'
import Sessions from './collections/Sessions'
import Staffimages from './collections/Staffimages'
import Memberimages from './collections/Memberimages'

export default buildConfig({
  admin: {
    user: Users.slug,
    bundler: webpackBundler(),
  },
  cors: ['http://localhost:5173/'],
  csrf: ['http://localhost:5173/'],
  editor: slateEditor({}),
  collections: [
    Users,
    Members,
    Divisions,
    Staffs,
    Teams,
    Sessions,
    Staffimages,
    Memberimages,
  ],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
  plugins: [payloadCloud()],
  db: mongooseAdapter({
    url: process.env.DATABASE_URI,
  }),
})
