require('dotenv').config({ path: '.env.local' })

console.log('Step 1: Loading @vercel/blob...')

try {
  const blob = require('@vercel/blob')
  console.log('✅ Package loaded successfully')
  console.log('Available exports:', Object.keys(blob))
} catch (error) {
  console.error('❌ Failed to load package:', error.message)
  process.exit(1)
}

console.log('\nStep 2: Checking environment variables...')
console.log('BLOB_READ_WRITE_TOKEN exists:', !!process.env.BLOB_READ_WRITE_TOKEN)
