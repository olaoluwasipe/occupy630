<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RolesAndPermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create Permissions
        $permissions = ['manage learners', 'manage sessions', 'manage tutors', 'manage courses', 'manage notifications'];
        foreach ($permissions as $permission) {
            Permission::create(['name' => $permission]);
        }

        // Create Roles and assign existing permissions
        $role = Role::create(['name' => 'admin']);
        // $role->givePermissionTo('');

        $role = Role::create(['name' => 'superadmin']);
        $role->givePermissionTo(Permission::all());
    }
}
