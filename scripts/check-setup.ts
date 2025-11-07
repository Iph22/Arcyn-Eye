#!/usr/bin/env ts-node

/**
 * ARCYN EYE - Setup Verification Script
 * Run this to check if your environment is properly configured
 */

import { createClient } from '@supabase/supabase-js'

const REQUIRED_ENV_VARS = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
]

interface CheckResult {
  name: string
  status: 'pass' | 'fail' | 'warning'
  message: string
}

const results: CheckResult[] = []

async function checkEnvironmentVariables() {
  console.log('\n🔍 Checking Environment Variables...\n')
  
  for (const envVar of REQUIRED_ENV_VARS) {
    if (process.env[envVar]) {
      results.push({
        name: envVar,
        status: 'pass',
        message: 'Set'
      })
      console.log(`✅ ${envVar}: Set`)
    } else {
      results.push({
        name: envVar,
        status: 'fail',
        message: 'Missing'
      })
      console.log(`❌ ${envVar}: Missing`)
    }
  }
}

async function checkDatabaseTables() {
  console.log('\n🗄️  Checking Database Tables...\n')
  
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  
  if (!supabaseUrl || !supabaseKey) {
    console.log('⚠️  Skipping database check (missing env vars)')
    return
  }
  
  try {
    const supabase = createClient(supabaseUrl, supabaseKey)
    
    // Check ai_connections table
    const { data: connections, error: connError } = await supabase
      .from('ai_connections')
      .select('count')
      .limit(1)
    
    if (connError) {
      results.push({
        name: 'ai_connections table',
        status: 'fail',
        message: connError.message
      })
      console.log(`❌ ai_connections table: ${connError.message}`)
      console.log('\n📋 ACTION REQUIRED:')
      console.log('   Run the database migration in Supabase SQL Editor:')
      console.log('   File: supabase/migrations/002_ai_connections.sql\n')
    } else {
      results.push({
        name: 'ai_connections table',
        status: 'pass',
        message: 'Exists'
      })
      console.log('✅ ai_connections table: Exists')
    }
    
    // Check conversations table
    const { error: convError } = await supabase
      .from('conversations')
      .select('count')
      .limit(1)
    
    if (convError) {
      results.push({
        name: 'conversations table',
        status: 'fail',
        message: convError.message
      })
      console.log(`❌ conversations table: ${convError.message}`)
    } else {
      results.push({
        name: 'conversations table',
        status: 'pass',
        message: 'Exists'
      })
      console.log('✅ conversations table: Exists')
    }
    
    // Check messages table
    const { error: msgError } = await supabase
      .from('messages')
      .select('count')
      .limit(1)
    
    if (msgError) {
      results.push({
        name: 'messages table',
        status: 'fail',
        message: msgError.message
      })
      console.log(`❌ messages table: ${msgError.message}`)
    } else {
      results.push({
        name: 'messages table',
        status: 'pass',
        message: 'Exists'
      })
      console.log('✅ messages table: Exists')
    }
    
  } catch (error: any) {
    console.log(`❌ Database connection failed: ${error.message}`)
  }
}

async function printSummary() {
  console.log('\n' + '='.repeat(60))
  console.log('📊 SETUP VERIFICATION SUMMARY')
  console.log('='.repeat(60) + '\n')
  
  const passed = results.filter(r => r.status === 'pass').length
  const failed = results.filter(r => r.status === 'fail').length
  const warnings = results.filter(r => r.status === 'warning').length
  
  console.log(`✅ Passed: ${passed}`)
  console.log(`❌ Failed: ${failed}`)
  console.log(`⚠️  Warnings: ${warnings}`)
  console.log(`📝 Total Checks: ${results.length}\n`)
  
  if (failed > 0) {
    console.log('🔧 NEXT STEPS:\n')
    console.log('1. Set missing environment variables in .env.local')
    console.log('2. Run database migration in Supabase SQL Editor')
    console.log('3. Run this script again to verify\n')
    console.log('📚 See PHASE_2_SETUP.md for detailed instructions\n')
  } else {
    console.log('🎉 All checks passed! Your environment is ready.\n')
    console.log('🚀 Next steps:')
    console.log('   1. npm run dev')
    console.log('   2. Visit http://localhost:3000/dashboard/settings')
    console.log('   3. Connect your first AI model\n')
  }
}

async function main() {
  console.log('\n' + '='.repeat(60))
  console.log('🌟 ARCYN EYE - Setup Verification')
  console.log('='.repeat(60))
  
  await checkEnvironmentVariables()
  await checkDatabaseTables()
  await printSummary()
}

main().catch(console.error)
