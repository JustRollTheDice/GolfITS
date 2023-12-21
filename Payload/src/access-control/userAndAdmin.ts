import { Access } from 'payload/config'

export const authenticatedUser : Access = ({ req: { user } }) => {
  if (!user) {
    return false;
  }

  if (user.Collection === 'users') {
    return true;
  }
}

export default authenticatedUser;

// logged in user and admin