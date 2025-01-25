module.exports = {
  preset: 'ts-jest',
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  globals: {
    'ts-jest': {
      useESM: true,  // ใช้ ESM สำหรับ ts-jest
    },
  },
  extensionsToTreatAsEsm: ['.ts', '.tsx'],  // บอกให้ Jest พิจารณาไฟล์ .ts และ .tsx เป็น ESM
};
