import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { dummyProducts } from '../data/products';

export default function ProductPage() {
  const { id } = useParams();
  const product = dummyProducts.find(p => p.id === parseInt(id ?? '0'));
  const { addToCart } = useStore();

  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [infoTab, setInfoTab] = useState<'details' | 'fit' | 'shipping'>('details');

  if (!product) return <div className="text-white p-6">Product not found.</div>;

  const images = [product.image, ...(product.extraImages ?? [])];

  const renderInfoText = () => {
    switch (infoTab) {
      case 'details':
        return product.description;
      case 'fit':
        return `FITS TRUE TO SIZE\nMale model IS 5'7 WEARING SIZE LARGE\nFemale model IS 5'8 WEARING SIZE LARGE`;
      case 'shipping':
        return `SHIPS WITHIN 1 WEEK (UNLESS A PRE-ORDER)\nFOR PRE-ORDERS, PLEASE ALLOW 6 - 8 WEEKS FOR PRODUCTION\nCUSTOMS NOTICE: ALL CUSTOMERS OUTSIDE THE UNITED STATES ARE RESPONSIBLE FOR THE CUSTOMS FEES / DUTIES THAT MAY BE CHARGED BY THEIR COUNTRY FOR IMPORT.`;
      default:
        return '';
    }
  };

  return (
    <div className="bg-black min-h-screen text-white pt-24 px-4 flex flex-col">
      <div className="max-w-2xl mx-auto text-center flex-1">

        {/* Main Image */}
        <img
          src={selectedImage || product.image}
          alt={product.name}
          className="w-full mb-4 object-cover"
        />
        <div className="flex justify-center space-x-2 mb-4">
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Thumbnail ${index + 1}`}
              className={`w-16 h-16 object-cover border cursor-pointer ${
                selectedImage === img ? 'border-white' : 'border-gray-600'
              }`}
              onClick={() => setSelectedImage(img)}
            />
          ))}
        </div>

        {/* Product Title & Price */}
        <h1 className="text-2xl font-bold mb-1">{product.name}</h1>
        <p className="text-lg mb-4 text-gray-300">{product.price}</p>

        {/* Size Selector */}
        <div className="flex justify-center space-x-2 mb-4">
          {product.sizes.map(size => (
            <button
              key={size}
              className={`w-10 h-10 rounded-full flex items-center justify-center border transition ${
                selectedSize === size ? 'bg-white text-black' : 'text-white border-white'
              }`}
              onClick={() => setSelectedSize(size)}
            >
              {size}
            </button>
          ))}
        </div>

        {/* Add to Cart Button */}
        <button
          disabled={!selectedSize}
          onClick={() => addToCart({ ...product, size: selectedSize ?? undefined })}
          className={`w-full py-2 rounded mb-6 font-semibold transition ${
            selectedSize
              ? 'bg-white text-black hover:bg-gray-300'
              : 'bg-gray-700 text-gray-400 cursor-not-allowed'
          }`}
        >
          Add to Cart
        </button>

        {/* Info Toggle Panel */}
        <div className="border-t border-gray-700 pt-4 pb-20">
          <div className="flex justify-center space-x-6 mb-4 text-sm font-medium">
            <button
              onClick={() => setInfoTab('details')}
              className={infoTab === 'details' ? 'underline' : 'hover:underline'}
            >
              DETAILS
            </button>
            <button
              onClick={() => setInfoTab('fit')}
              className={infoTab === 'fit' ? 'underline' : 'hover:underline'}
            >
              FIT / SIZING
            </button>
            <button
              onClick={() => setInfoTab('shipping')}
              className={infoTab === 'shipping' ? 'underline' : 'hover:underline'}
            >
              SHIPPING
            </button>
          </div>
          <pre className="whitespace-pre-wrap text-sm text-gray-300">
            {renderInfoText()}
          </pre>
        </div>
      </div>
    </div>
  );
}
