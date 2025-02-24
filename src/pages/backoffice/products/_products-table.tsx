import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button.tsx'
import type { ProductCategory, Photo, Product, Stock, ProductVariant } from '@/lib/types'
import { PRODUCTS_FOLDER, URL_BACKEND, URL_BACKEND_UPLOADS } from 'astro:env/client'
import CustomSheet from '@/components/CustomSheet'

import { deletePhotoProduct, deleteProduct, deleteStock, fetchProductsData, unlinkProductCategory, unlinkProductVariant } from '@/services/productService.ts'
import PhotoForm from './_photo-form'
import StockForm from './_stock-form.tsx'
import ProductCategoryForm from './_product-category-form.tsx'
import ProductVariantForm from './_product-variant-form.tsx'
import ProductForm from './_product-form.tsx'

import { Edit2, Plus, PlusIcon, Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { CustomDialog } from '@/components/CustomDialog.tsx'
import { useToast } from '@/hooks/use-toast.ts'
import { CustomBreadcrumb } from '@/components/CustomBreadcrumb.tsx'

interface ProductSheetProps {
    product?: Product
    onCreateOrUpdateProduct?: (result: { ok: boolean; success?: string; error?: string }) => Promise<void>
}

const ProductSheet = ({ product, onCreateOrUpdateProduct }: ProductSheetProps) => {
    return (
        <CustomSheet
            sheetTitle={product?.name}
            sheetTrigger={
                <Button>
                    {product ? (
                        <Edit2 size={14} />
                    ) : (
                        <small className="flex items-center gap-2 pr-1">
                            <PlusIcon size={14} /> Añadir producto
                        </small>
                    )}
                </Button>
            }>
            <ProductForm
                onProductCreatedOrUpdated={onCreateOrUpdateProduct}
                product={product}
            />
        </CustomSheet>
    )
}

interface PhotoSheetProps {
    product: Product
    onCreateOrUpdateItem: (result: { ok: boolean; success?: string | undefined; error?: string | undefined }) => Promise<void>
}

const PhotoSheet = ({ product, onCreateOrUpdateItem }: PhotoSheetProps) => {
    const [photos, setPhotos] = useState<Photo[]>([])
    const [photoSelected, setPhotoSelected] = useState<Photo | undefined>(product?.photos && product?.photos[0])

    const handleDeletePhoto = async () => {
        if (!photoSelected) {
            return
        }
        const result = await deletePhotoProduct(product, photoSelected)

        setPhotos((prev) => prev.filter((item) => item.id !== result.data?.id))
        onCreateOrUpdateItem(result)
    }

    useEffect(() => {
        setPhotoSelected(photos[0])
    }, [photos])

    useEffect(() => {
        if (product?.photos) setPhotos(product?.photos)
    }, [])

    return (
        <CustomSheet
            sheetTrigger={
                <Button className="p-1">
                    <Plus size={10} />
                </Button>
            }>
            <div
                className="h-[60dvh] overflow-y-auto"
                style={{ scrollbarWidth: 'none' }}>
                <picture className="w-full h-96 block mb-2">
                    {photoSelected?.image && (
                        <img
                            src={`${URL_BACKEND_UPLOADS + PRODUCTS_FOLDER + (photoSelected ? photoSelected?.image : photos[0]?.image)}`}
                            className="object-contain w-full h-full"
                            alt=""
                        />
                    )}
                </picture>
                {photos && photos.length > 1 && (
                    <Button
                        onClick={() => handleDeletePhoto()}
                        className="relative !-top-10">
                        <Trash2 />
                    </Button>
                )}
                <div className="grid grid-cols-4 gap-2 mb-8">
                    {photos &&
                        photos.length > 0 &&
                        photos.map((photo) => (
                            <picture
                                className="aspect-square block hover:cursor-pointer"
                                key={photo.id}
                                onClick={() => setPhotoSelected(photo)}>
                                <img
                                    className="object-cover w-full h-full rounded-md"
                                    src={`${URL_BACKEND_UPLOADS + PRODUCTS_FOLDER + photo?.image}`}
                                    alt=""
                                />
                            </picture>
                        ))}
                </div>
            </div>

            <PhotoForm
                product={product}
                onPhotoUploaded={onCreateOrUpdateItem}
                setPhotos={setPhotos}
            />
        </CustomSheet>
    )
}

interface StockSheetProps {
    product: Product
    onCreateOrUpdateItem: (result: { ok: boolean; success?: string | undefined; error?: string | undefined }) => Promise<void>
}

const StockSheet = ({ product, onCreateOrUpdateItem }: StockSheetProps) => {
    const handleDeleteStock = async (stockId: string) => {
        const result = await deleteStock(product, stockId)

        onCreateOrUpdateItem(result)
    }

    return (
        <CustomSheet sheetTrigger={<Button className={`border ${product.stock && product.stock?.length > 0 ? 'border-gray-200' : 'border-red-300 text-red-400'} p-2 text-xs`}>Stock</Button>}>
            <div>
                <ul className="space-y-2 mb-10">
                    {product.stock &&
                        product.stock.length > 0 &&
                        product.stock.map((itemStock, index) => (
                            <li
                                key={`size-${index}`}
                                className="flex justify-between items-center bg-gray-100 rounded-md p-2">
                                <div>
                                    {itemStock.quantity}
                                    {itemStock.size}
                                    {itemStock.sku}
                                </div>
                                <div>
                                    <CustomSheet
                                        sheetTrigger={
                                            <Button className="text-xs mr-2">
                                                <Edit2 />
                                            </Button>
                                        }>
                                        <StockForm
                                            method="update"
                                            product={product}
                                            stock={itemStock}
                                            onStockCreated={onCreateOrUpdateItem}
                                        />
                                    </CustomSheet>

                                    <Button onClick={() => handleDeleteStock(itemStock.id)}>
                                        <Trash2 />
                                    </Button>
                                </div>
                            </li>
                        ))}
                </ul>
            </div>
            <StockForm
                method="create"
                product={product}
                onStockCreated={onCreateOrUpdateItem}
            />
        </CustomSheet>
    )
}

interface CategoriesSheetProps {
    product: Product
    onCreateOrUpdateItem: (result: { ok: boolean; success?: string | undefined; error?: string | undefined }) => Promise<void>
}

const CategoriesSheet = ({ product, onCreateOrUpdateItem }: CategoriesSheetProps) => {
    const [productCategories, setProductCategories] = useState<ProductCategory[]>([])

    const handleDeleteProductCategory = async (productCategoryId: string) => {
        const result = await unlinkProductCategory(product, productCategoryId)

        onCreateOrUpdateItem(result)
    }

    useEffect(() => {
        if (product?.categories) setProductCategories(product?.categories)
    }, [product?.categories])

    return (
        <CustomSheet sheetTrigger={<Button className={`border ${productCategories?.length > 0 ? 'border-gray-200' : 'border-red-300 text-red-400'} text-xs`}>Categorías</Button>}>
            <ul className="space-y-2 mb-10">
                {productCategories &&
                    productCategories.length > 0 &&
                    productCategories.map((productCategory, index) => (
                        <li
                            key={`category-${index}`}
                            className="flex justify-between items-center bg-gray-100 rounded-md p-2">
                            {productCategory.category?.name}
                            <Button onClick={() => handleDeleteProductCategory(productCategory.id)}>
                                <Trash2 />
                            </Button>
                        </li>
                    ))}
            </ul>

            <ProductCategoryForm
                product={product}
                productCategories={productCategories}
                onProductCategoryAdded={onCreateOrUpdateItem}
            />
        </CustomSheet>
    )
}

interface ProductVariantProps {
    product: Product
    products: Product[]
    onCreateOrUpdateItem: (result: { ok: boolean; success?: string | undefined; error?: string | undefined }) => Promise<void>
}
const ProductVariantsSheet = ({ product, products, onCreateOrUpdateItem }: ProductVariantProps) => {
    const handleDeleteProductVariant = async (productVariantId: string) => {
        const result = await unlinkProductVariant(product, productVariantId)

        onCreateOrUpdateItem(result)
    }

    return (
        <CustomSheet
            sheetTitle={product?.name}
            sheetTrigger={<Button className={`border ${product.variants && product.variants?.length > 0 ? 'border-gray-200' : 'border-red-300 text-red-400'} text-xs`}>Variantes</Button>}>
            {product.variants && (
                <>
                    <ul className="space-y-2 mb-4">
                        {product.variants.length > 0 &&
                            product.variants.map((variant, index) => (
                                <li
                                    key={`variant-${index}`}
                                    className="flex justify-between items-center bg-gray-100 rounded-md p-2">
                                    <span
                                        className="size-4 border border-black rounded-full"
                                        style={{ backgroundColor: variant.mainProduct.colorHex }}></span>
                                    {variant.mainProduct.name}
                                    <Button onClick={() => handleDeleteProductVariant(variant.id)}>
                                        <Trash2 />
                                    </Button>
                                </li>
                            ))}
                    </ul>

                    <ProductVariantForm
                        product={product}
                        products={products}
                        onProductVariantLinked={onCreateOrUpdateItem}
                    />
                </>
            )}
        </CustomSheet>
    )
}

interface ActionsProps {
    product: Product
    onCreateOrUpdateItem: (result: { ok: boolean; success?: string; error?: string }) => Promise<void>
}

const Actions = ({ product, onCreateOrUpdateItem }: ActionsProps) => {
    const handleDeleteProduct = async () => {
        const result = await deleteProduct(product)
        onCreateOrUpdateItem(result)
    }

    return (
        <>
            <ProductSheet
                product={product}
                onCreateOrUpdateProduct={onCreateOrUpdateItem}
            />

            <CustomDialog
                triggerText={
                    <Button type="button">
                        <Trash2
                            color="red"
                            size={10}
                        />
                    </Button>
                }
                dialogTitle="Eliminar producto"
                dialogDescription="¿Está seguro/a que desea eliminar este producto?">
                <Button onClick={handleDeleteProduct}>Seguro/a</Button>
            </CustomDialog>
        </>
    )
}

interface CellProps {
    product: Product
    products: Product[]
    onCreateOrUpdateItem: (result: { ok: boolean; success?: string; error?: string }) => Promise<void>
}

const Cell = ({ product, products, onCreateOrUpdateItem }: CellProps) => {
    return (
        <>
            <TableCell>
                <div className="flex items-center gap-2">
                    <figure
                        className="size-3 rounded-full border border-black"
                        style={{ backgroundColor: product.colorHex }}></figure>
                    <div>
                        {product.name}

                        <small className="text-[10px] block mt-2">Tallas: {product.stock?.map((stock) => stock.size).join(', ')}</small>
                        <small className="text-[10px] block">Categorías: {product.categories?.map((category) => category.category.name).join(', ')}</small>
                    </div>
                </div>
            </TableCell>
            <TableCell>
                <div className="flex items-center space-x-2">
                    <picture className="aspect-square size-20 block">
                        {product?.photos && product?.photos.length > 0 && (
                            <img
                                className="object-cover w-full h-full rounded-md"
                                src={`${URL_BACKEND_UPLOADS + PRODUCTS_FOLDER + product.photos[0].image}`}
                                alt=""
                            />
                        )}
                    </picture>

                    <PhotoSheet
                        onCreateOrUpdateItem={onCreateOrUpdateItem}
                        product={product}
                    />
                </div>
            </TableCell>
            <TableCell>
                <div className="flex items-center gap-2">
                    <StockSheet
                        product={product}
                        onCreateOrUpdateItem={onCreateOrUpdateItem}
                    />

                    <CategoriesSheet
                        product={product}
                        onCreateOrUpdateItem={onCreateOrUpdateItem}
                    />

                    <ProductVariantsSheet
                        product={product}
                        products={products}
                        onCreateOrUpdateItem={onCreateOrUpdateItem}
                    />

                    <span className="text-gray-400">|</span>
                    <div className="flex items-center gap-2">
                        <Actions
                            product={product}
                            onCreateOrUpdateItem={onCreateOrUpdateItem}
                        />
                    </div>
                </div>
            </TableCell>
        </>
    )
}

export default function ProductsTable() {
    const [products, setProducts] = useState<Product[]>([])
    const { toast } = useToast()

    const handleProductOperation = async (result: { ok: boolean; success?: string; error?: string }) => {
        getProducts()

        if (result.ok) {
            toast({
                title: 'Good',
                description: result.success,
            })
        } else {
            toast({
                title: 'Bad',
                description: result.error,
            })
        }
    }

    const getProducts = async () => {
        const data = await fetchProductsData()
        setProducts(data)
    }

    useEffect(() => {
        getProducts()
    }, [])

    const dropdownLinks = [
        { title: 'Categorías', url: '/backoffice/categories' },
        { title: 'Clientes', url: '/backoffice/customers' },
        { title: 'Mi E-Commerce', url: '/backoffice/my-ecommerce' },
        { title: 'Pedidos', url: '/backoffice/orders' },
        { title: 'Políticas', url: '/backoffice/policies' },
    ]
    const homeLink = { title: 'Backoffice', url: '/backoffice' }

    return (
        <div className="w-full">
            <h1 className="text-3xl font-medium mb-6 text-center">
                <span style={{ viewTransitionName: 'products-text' }}>Productos</span>
            </h1>

            <div className="max-w-screen-sm lg:max-w-screen-lg xl:max-w-screen-xl mx-auto lg:shadow-md rounded-sm p-4">
                <div className="mb-4">
                    <CustomBreadcrumb
                        homeLink={homeLink}
                        currentPath="Productos"
                        dropdownLinks={dropdownLinks}
                    />
                </div>

                <ProductSheet onCreateOrUpdateProduct={handleProductOperation} />

                <Table className="hidden lg:table mt-4 table-fixed border-separate border-spacing-y-3">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="uppercase text-xs">Producto</TableHead>
                            <TableHead className="uppercase text-xs">Fotos</TableHead>
                            <TableHead className="uppercase text-xs">Acciones</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {products && products.length > 0 ? (
                            products.map((product, index) => (
                                <TableRow
                                    key={index}
                                    className="relative bg-white/80 dark:bg-white/10 backdrop-blur-sm hover:opacity-80"
                                    style={{ viewTransitionName: index === 0 ? 'products-box' : '' }}>
                                    <Cell
                                        product={product}
                                        products={products}
                                        onCreateOrUpdateItem={handleProductOperation}
                                    />
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={4}>
                                    <div
                                        className="bg-white/20 backdrop-blur-sm p-4 min-h-[96px] flex items-center"
                                        style={{ viewTransitionName: 'products-box' }}>
                                        No hay productos para mostrar
                                    </div>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>

                <div className="block lg:hidden">
                    {products && products.length > 0 ? (
                        products.map((product, index) => (
                            <div
                                className="bg-white/80 backdrop-blur-sm p-4 rounded-md shadow-sm mt-4"
                                key={index}>
                                <div className="flex items-center space-x-4">
                                    {product.photos && product?.photos.length > 0 && (
                                        <picture className="relative top-6">
                                            <img
                                                src={`${URL_BACKEND_UPLOADS}/products/${product?.photos[0].image}`}
                                                className="block size-20 rounded-md object-cover"
                                                alt=""
                                            />
                                        </picture>
                                    )}
                                    <div className="flex-1">
                                        <h1 className="text-xs text-left md:text-lg">{product.name}</h1>
                                        <p className="h-8 text-xs mt-2 line-clamp-2 overflow-hidden">{product.description}</p>
                                        <small className="text-[10px] block mt-3">Tallas: {product.stock?.map((stock) => stock.size).join(', ')}</small>
                                        <small className="text-[10px] block">Categorías: {product.categories?.map((category) => category.category.name).join(', ')}</small>
                                    </div>
                                </div>
                                <div className="flex items-center ml-[94px] space-x-1 mt-4">
                                    <StockSheet
                                        product={product}
                                        onCreateOrUpdateItem={handleProductOperation}
                                    />

                                    <CategoriesSheet
                                        product={product}
                                        onCreateOrUpdateItem={handleProductOperation}
                                    />

                                    <ProductVariantsSheet
                                        product={product}
                                        products={products}
                                        onCreateOrUpdateItem={handleProductOperation}
                                    />

                                    <Actions
                                        product={product}
                                        onCreateOrUpdateItem={handleProductOperation}
                                    />
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-500 mt-10">No hay productos para mostrar</p>
                    )}
                </div>
            </div>
        </div>
    )
}
