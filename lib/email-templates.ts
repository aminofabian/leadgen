export const createEmailTemplate = (
  title: string,
  message: string,
  buttonText: string,
  buttonLink: string
) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <style>
        body { 
            font-family: system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            line-height: 1.6;
            color: #1a1a1a;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f8f8f8;
        }
        .container {
            background-color: #ffffff;
            border-radius: 12px;
            padding: 40px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        }
        .logo-container {
            text-align: center;
            margin-bottom: 32px;
        }
        h1 {
            text-align: center;
            margin-bottom: 24px;
            font-size: 32px;
            font-weight: 700;
            line-height: 1.2;
        }
        .igleadgen-text {
            color: #ff4500;
        }
        p {
            margin-bottom: 24px;
            font-size: 16px;
            color: #4a4a4a;
            line-height: 1.8;
        }
        .button-container {
            text-align: center;
            margin: 32px 0;
        }
        .button {
            display: inline-block;
            padding: 14px 32px;
            background-color: #ff4500;
            color: #ffffff !important;
            text-decoration: none;
            border-radius: 8px;
            font-weight: 600;
            font-size: 16px;
            transition: all 0.3s ease;
            box-shadow: 0 2px 4px rgba(255, 69, 0, 0.2);
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="logo-container">
            <h1><span class="igleadgen-text">IgLeadGen</span></h1>
        </div>
        <h1>${title}</h1>
        <p>${message}</p>
        <div class="button-container">
            <a href="${buttonLink}" class="button">${buttonText}</a>
        </div>
    </div>
</body>
</html>
`;
