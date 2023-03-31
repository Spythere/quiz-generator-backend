import { readFileSync } from 'fs';
import Handlebars from 'handlebars';
import { join } from 'path';
import puppeteer from 'puppeteer';

async function compile() {
  const html = readFileSync(
    join(process.cwd(), 'src', 'templates', 'pdfTemplate.hbs'),
    'utf8',
  );
  return Handlebars.compile(html)({});
}

export async function generatePDF(quizId: number) {
  try {
    const browser = await puppeteer.launch({
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
      ],
      headless: true,
    });
    const page = await browser.newPage();
    const content = (await compile()).toString();

    await page.setContent(content);
    await page.emulateMediaType('screen');
    const buffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      path: 'kurwa.pdf',
    });

    await browser.close();

    return buffer;
  } catch (error) {
    console.log(error);
    return null;
  }
}
