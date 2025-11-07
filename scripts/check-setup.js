#!/usr/bin/env node

/**
 * ARCYN EYE - Setup Verification Script
 * Run with: node scripts/check-setup.js
 */

require('dotenv').config({ path: '.env.local' })

const REQUIRED_ENV_VARS = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
]

async function checkEnvironmentVariables() {
  console.log('\n🔍 Checking Environment Variables...\n')
  
  let allPresent = true
  
  for (const envVar of REQUIRED_ENV_VARS) {
    if (process.env[envVar]) {
      console.log(`✅ ${envVar}: Set`)
    } else {
      console.log(`❌ ${envVar}: Missing`)
      allPresent = false
    }
  }
  
  return allPresent
}

async function checkDatabaseTables() {
  console.log('\n🗄️  Checking Database Connection...\n')
  
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  
  if (!supabaseUrl || !supabaseKey) {
    console.log('⚠️  Skipping database check (missing env vars)\n')
    return false
  }
  
  try {
    // Simple fetch to check if Supabase is accessible
    const response = await fetch(`${supabaseUrl}/rest/v1/`, {
      headers: {
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`
      }
    })
    
    if (response.ok) {
      console.log('✅ Supabase connection: Working')
      console.log('\n📋 NOTE: To verify database tables exist, visit:')
      console.log(`   ${supabaseUrl.replace('//', '//app.')}/project/_/editor`)
      console.log('   Check for: ai_connections, conversations, messages\n')
      return true
    } else {
      console.log('❌ Supabase connection: Failed')
      console.log(`   Status: ${response.status}\n`)
      return false
    }
  } catch (error) {
    console.log(`❌ Supabase connection: Failed`)
    console.log(`   Error: ${error.message}\n`)
    return false
  }
}

async function printNextSteps(envOk, dbOk) {
  console.log('\n' + '='.repeat(60))
  console.log('📊 SETUP STATUS')
  console.log('='.repeat(60) + '\n')
  
  if (!envOk) {
    console.log('🔧 REQUIRED: Set Environment Variables\n')
    console.log('Create .env.local file with:')
    console.log('NEXT_PUBLIC_SUPABASE_URL=your_supabase_url')
    console.log('NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key\n')
  }
  
  if (envOk && !dbOk) {
    console.log('🔧 REQUIRED: Run Database Migration\n')
    console.log('1. Go to Supabase Dashboard → SQL Editor')
    console.log('2. Copy contents of: supabase/migrations/002_ai_connections.sql')
    console.log('3. Paste and click "Run"\n')
  }
  
  if (envOk && dbOk) {
    console.log('✅ Environment configured!\n')
    console.log('🚀 NEXT STEPS:\n')
    console.log('1. Run database migration (if not done):')
    console.log('   - File: supabase/migrations/002_ai_connections.sql')
    console.log('   - Run in Supabase SQL Editor\n')
    console.log('2. Start development server:')
    console.log('   npm run dev\n')
    console.log('3. Visit http://localhost:3000/dashboard/settings')
    console.log('4. Connect your first AI model\n')
    console.log('📚 See PHASE_2_SETUP.md for detailed instructions\n')
  }
}

async function main() {
  console.log('\n' + '='.repeat(60))
  console.log('🌟 ARCYN EYE - Setup Verification')
  console.log('='.repeat(60))
  
  const envOk = await checkEnvironmentVariables()
  const dbOk = await checkDatabaseTables()
  await printNextSteps(envOk, dbOk)
}

main().catch(console.error)
