// Câu 1: Constructor Product
function Product(id, name, price, quantity, category, isAvailable) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.quantity = quantity;
    this.category = category;
    this.isAvailable = isAvailable;
}

// Câu 2: Khởi tạo mảng products
const products = [
    new Product(1, "Laptop Dell", 25000000, 5, "Electronics", true),
    new Product(2, "iPhone 15", 35000000, 3, "Electronics", true),
    new Product(3, "Tai nghe Sony", 3000000, 0, "Accessories", true),
    new Product(4, "Chuột Logitech", 800000, 10, "Accessories", true),
    new Product(5, "Bàn phím cơ", 2000000, 7, "Accessories", false),
    new Product(6, "Màn hình LG", 7000000, 2, "Electronics", true)
];

// Câu 3: Mảng mới chỉ chứa name và price
const nameAndPrice = products.map(p => ({
    name: p.name,
    price: p.price
}));
console.log("Câu 3:", nameAndPrice);

// Câu 4: Sản phẩm còn hàng
const inStockProducts = products.filter(p => p.quantity > 0);
console.log("Câu 4:", inStockProducts);

// Câu 5: Có sản phẩm > 30 triệu không
const hasExpensiveProduct = products.some(p => p.price > 30000000);
console.log("Câu 5:", hasExpensiveProduct);

// Câu 6: Tất cả Accessories có đang bán không
const allAccessoriesAvailable = products
    .filter(p => p.category === "Accessories")
    .every(p => p.isAvailable === true);
console.log("Câu 6:", allAccessoriesAvailable);

// Câu 7: Tổng giá trị kho
const totalInventoryValue = products.reduce(
    (total, p) => total + p.price * p.quantity,
    0
);
console.log("Câu 7:", totalInventoryValue);

// Câu 8: for...of
console.log("Câu 8:");
for (const p of products) {
    console.log(
        `Tên: ${p.name} - Danh mục: ${p.category} - Trạng thái: ${p.isAvailable ? "Đang bán" : "Ngừng bán"}`
    );
}

// Câu 9: for...in
console.log("Câu 9:");
for (const key in products[0]) {
    console.log(key, ":", products[0][key]);
}

// Câu 10: Tên sản phẩm đang bán và còn hàng
const sellingAndInStockNames = products
    .filter(p => p.isAvailable && p.quantity > 0)
    .map(p => p.name);

console.log("Câu 10:", sellingAndInStockNames);
