<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RolesAndPermissionsSeeder extends Seeder
{
    public function run()
    {
        // Create Permissions
        $permissions = [
            'upload apartments',
            'manage tenants',
            'approve rentals',
            'view rental history',
            'manage employees',
            'manage own profile',
            'manage all data'
        ];

        foreach ($permissions as $permission) {
            Permission::create(['name' => $permission]);
        }

        // Create Roles and assign permissions
        // Landlord Role
        $landlordRole = Role::create(['name' => 'landlord']);
        $landlordRole->givePermissionTo([
            'upload apartments',
            'view rental history',
            'manage own profile'
        ]);

        // Employer/Company Role
        $employerRole = Role::create(['name' => 'employer']);
        $employerRole->givePermissionTo([
            'manage employees',
            'view rental history',
            'approve rentals',
            'manage own profile'
        ]);

        // Employee Role
        $employeeRole = Role::create(['name' => 'employee']);
        $employeeRole->givePermissionTo([
            'view rental history',
            'manage own profile'
        ]);

        // Superadmin Role with all permissions
        $superAdminRole = Role::create(['name' => 'superadmin']);
        $superAdminRole->givePermissionTo(Permission::all());
    }
}
