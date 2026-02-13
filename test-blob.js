require('dotenv').config({ path: '.env.local' })

const { put, list, del } = require('@vercel/blob')

async function runTests() {
  console.log('🧪 Vercel Blob 完整测试\n')
  console.log('=' .repeat(50))

  // 1. 环境检查
  console.log('\n✅ 环境变量已加载')
  console.log(`Token: ${process.env.BLOB_READ_WRITE_TOKEN.substring(0, 25)}...`)

  // 2. 上传测试
  console.log('\n📤 测试 1: 上传文件')
  const testFile = Buffer.from(`测试内容 - ${new Date().toISOString()}`)
  const filename = `test-${Date.now()}.txt`

  try {
    const uploadResult = await put(filename, testFile, { access: 'public' })
    console.log('   ✅ 上传成功')
    console.log(`   URL: ${uploadResult.url}`)
  } catch (error) {
    console.log('   ❌ 失败:', error.message)
    throw error
  }

  // 3. 列出测试
  console.log('\n📋 测试 2: 列出文件')
  try {
    const listResult = await list()
    console.log(`   ✅ 找到 ${listResult.blobs.length} 个文件`)

    if (listResult.blobs.length > 0) {
      console.log('   最近的文件:')
      listResult.blobs.slice(-3).forEach(b => {
        console.log(`   - ${b.pathname}`)
      })
    }
  } catch (error) {
    console.log('   ❌ 失败:', error.message)
    throw error
  }

  // 4. 删除测试
  console.log('\n🗑️  测试 3: 删除文件')
  try {
    await del(filename)
    console.log('   ✅ 删除成功')
  } catch (error) {
    console.log('   ❌ 失败:', error.message)
    throw error
  }

  console.log('\n' + '='.repeat(50))
  console.log('\n🎉 所有测试通过！Vercel Blob 配置正常工作\n')
}

runTests().catch(error => {
  console.error('\n💥 测试失败:', error.message)
  process.exit(1)
})
