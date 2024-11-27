# CSV Parsing Tool 📁

## Overview

The CSV Parsing Tool is a simple yet powerful application that allows users to preview the first 10 rows of a CSV file (this number is customizable by the user). It also provides the functionality to add a new header (which can be a header or just a row) to the file and then download the updated file.

## Getting Started

To run the development server, use one of the following commands:

```bash
pnpm install
pnpm dev
```

## Usage

1. Upload a CSV file using the "Upload CSV" button.
2. Preview the first 10 rows of the uploaded CSV file by clicking the "Preview" button.
3. Add a new header to the CSV file by clicking the "Add Header" button.
4. Download the updated CSV file by clicking the "Download CSV" button.

## Customization

The number of rows to preview can be customized by changing the `MAX_ROWS_TO_SHOW` constant in the `src/app/page.tsx` file.

## Contributing

We welcome contributions to improve the functionality and usability of the CSV Parsing Tool. Please see our [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on how to submit improvements and bug fixes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
