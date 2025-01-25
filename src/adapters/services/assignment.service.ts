import { OrderMocks } from "../../mocks/products.mocks";

export class Assignment {
  // ใช้ LOOP แบบธรรมดา
  getTotalRevenueV1(): number {
    let revenue = 0;
    for (let item of OrderMocks) {
      revenue += item.product_price * item.amount;
    }
    return revenue;
  }

  // เปลี่ยนจาก Loop มาใช้ reduce
  // การใช้ reduce แทน for loop จะช่วยให้โค้ดกระชับและสามารถคำนวณได้รวดเร็วขึ้นในบางกรณี ดังนั้น เมื่อเทส อาจจะมีบางเคสที่ใช้เวลาเยอะกว่าเช่นกัน
  getTotalRevenueV2(): number {
    const total = OrderMocks.reduce((total, item) => {
      return total + item.product_price * item.amount;
    }, 0);
    return total;
  }

  // การฟั่นข้อมูลออกเป็นชิ้นๆ แล้วทำงานแบบ Parallel
  getTotalRevenueV3(): Promise<any> {
    return new Promise(resolve => {
      const chunkSize = 10000; // จำนวนข้อมูลในแต่ละชุด
      const chunks = Math.ceil(OrderMocks.length / chunkSize);
      const promises = [];

      for (let i = 0; i < chunks; i++) {
        const chunk = OrderMocks.slice(i * chunkSize, (i + 1) * chunkSize);
        const promise = new Promise<number>(resolve => {
          const revenue = chunk.reduce((total, item) => total + item.product_price * item.amount, 0);
          resolve(revenue);
        });
        promises.push(promise);
      }

      Promise.all(promises).then(revenues => {
        const totalRevenue = revenues.reduce((total, revenue) => total + revenue, 0);
        resolve(totalRevenue);
      });
    });
  }
}
