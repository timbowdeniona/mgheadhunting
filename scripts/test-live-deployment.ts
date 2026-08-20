import https from 'https';

const BASE_URL = 'https://mgheadhunting.netlify.app';
const PREVIEW_SECRET = 'mgh_preview_secret_2026';

function fetchUrl(url: string, headers: Record<string, string> = {}): Promise<{ statusCode?: number; headers: any; body: string }> {
  return new Promise((resolve, reject) => {
    https.get(url, { headers }, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: data,
        });
      });
    }).on('error', reject);
  });
}

async function runLiveTests() {
  console.log('====================================================');
  console.log(`   TESTING PRODUCTION DEPLOYMENT: ${BASE_URL}   `);
  console.log('====================================================\n');

  // 1. Root page check
  console.log('1. Testing Homepage (CDN Published Delivery):');
  try {
    const res = await fetchUrl(BASE_URL);
    console.log(`   Status: HTTP ${res.statusCode}`);
    const hasBrand = res.body.includes('MG Headhunting') || res.body.includes('Building Products');
    console.log(`   Brand Title Present: ${hasBrand ? '✓ PASS' : '✗ FAIL'}`);
  } catch (err: any) {
    console.log('   ✗ Error:', err.message);
  }

  // 2. Draft Mode Activation Check
  console.log('\n2. Testing /api/draft endpoint (Draft Mode Activation):');
  const draftUrl = `${BASE_URL}/api/draft?secret=${PREVIEW_SECRET}&slug=about`;
  try {
    const res = await fetchUrl(draftUrl);
    console.log(`   Status: HTTP ${res.statusCode} (Expected 307 Redirect)`);
    console.log(`   Redirect Location: ${res.headers.location}`);
    const setCookie = res.headers['set-cookie'] || [];
    const hasDraftCookie = setCookie.some((c: string) => c.includes('__prerender_bypass'));
    console.log(`   Draft Cookie Issued (__prerender_bypass): ${hasDraftCookie ? '✓ PASS' : '✗ FAIL'}`);
  } catch (err: any) {
    console.log('   ✗ Error:', err.message);
  }

  // 3. Draft Mode Deactivation Check
  console.log('\n3. Testing /api/disable-draft endpoint (Draft Mode Exit):');
  const disableUrl = `${BASE_URL}/api/disable-draft?redirect=/about`;
  try {
    const res = await fetchUrl(disableUrl);
    console.log(`   Status: HTTP ${res.statusCode} (Expected 307 Redirect)`);
    console.log(`   Redirect Location: ${res.headers.location}`);
    const setCookie = res.headers['set-cookie'] || [];
    const hasClearedCookie = setCookie.some((c: string) => c.includes('__prerender_bypass=;'));
    console.log(`   Draft Cookie Cleared: ${hasClearedCookie ? '✓ PASS' : '✗ FAIL'}`);
  } catch (err: any) {
    console.log('   ✗ Error:', err.message);
  }

  // 4. Insights Draft Preview Route Check
  console.log('\n4. Testing Insight Article Draft Preview:');
  const insightDraftUrl = `${BASE_URL}/api/draft?secret=${PREVIEW_SECRET}&type=insight&slug=decarbonizing-heavy-materials-leadership-profile`;
  try {
    const res = await fetchUrl(insightDraftUrl);
    console.log(`   Status: HTTP ${res.statusCode}`);
    console.log(`   Target Route: ${res.headers.location}`);
  } catch (err: any) {
    console.log('   ✗ Error:', err.message);
  }

  // 5. Design System Workbench Check
  console.log('\n5. Testing Design System Blocks Playground (/design-system/blocks):');
  try {
    const res = await fetchUrl(`${BASE_URL}/design-system/blocks`);
    console.log(`   Status: HTTP ${res.statusCode}`);
    const hasWorkbench = res.body.includes('Storybook') || res.body.includes('Component Directory') || res.body.includes('Design System');
    console.log(`   Workbench Rendered: ${hasWorkbench ? '✓ PASS' : '✗ FAIL'}`);
  } catch (err: any) {
    console.log('   ✗ Error:', err.message);
  }

  console.log('\n====================================================');
  console.log('   PRODUCTION PREVIEW URLS READY FOR CONTENTFUL    ');
  console.log('====================================================');
  console.log(`• Modular Pages:`);
  console.log(`  ${BASE_URL}/api/draft?secret=${PREVIEW_SECRET}&slug={entry.fields.slug}`);
  console.log(`• Insight Articles:`);
  console.log(`  ${BASE_URL}/api/draft?secret=${PREVIEW_SECRET}&type=insight&slug={entry.fields.slug}`);
  console.log(`• Homepage / Site Settings:`);
  console.log(`  ${BASE_URL}/api/draft?secret=${PREVIEW_SECRET}&slug=`);
  console.log('====================================================\n');
}

runLiveTests();
