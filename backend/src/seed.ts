import { connectDB } from './config/db'
import { registerUser } from './services/userService'
import { UserRole } from './models/User'

const seedUsers = async () => {
  try {
    await connectDB()
    console.log('Connected to database')

    // Create admin user
    const adminUser = {
      email: 'admin@fashion.com',
      password: 'admin123',
      name: 'Admin User',
      role: UserRole.ADMIN,
    }

    // Create customer user
    const customerUser = {
      email: 'customer@fashion.com',
      password: 'customer123',
      name: 'Customer User',
      role: UserRole.CUSTOMER,
    }

    try {
      const createdAdmin = await registerUser(adminUser)
      console.log('✓ Admin user created:', createdAdmin)
    } catch (error: any) {
      console.log('⚠ Admin user already exists:', error.message)
    }

    try {
      const createdCustomer = await registerUser(customerUser)
      console.log('✓ Customer user created:', createdCustomer)
    } catch (error: any) {
      console.log('⚠ Customer user already exists:', error.message)
    }

    console.log('\nDefault users:')
    console.log('Admin Email: admin@fashion.com | Password: admin123')
    console.log('Customer Email: customer@fashion.com | Password: customer123')

    process.exit(0)
  } catch (error) {
    console.error('Seed error:', error)
    process.exit(1)
  }
}

seedUsers()
