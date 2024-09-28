import { SetMetadata } from '@nestjs/common';
// import { UserRoles } from 'src/entityes/role.model';



// export const ROLES_KEY = 'roles';
// export const Roles = (...roles: UserRole[]) => SetMetadata(ROLES_KEY, roles);

export const ROLE_KEY = 'role';
export const Role = (...roles: string[]) => SetMetadata(ROLE_KEY, roles);