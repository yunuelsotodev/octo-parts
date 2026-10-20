'use client'

import { useState } from "react"
import Image from "next/image";
import 'yet-another-react-lightbox/styles.css'
import 'yet-another-react-lightbox/plugins/counter.css'
import 'yet-another-react-lightbox/plugins/thumbnails.css'
import Lightbox from 'yet-another-react-lightbox'
import Zoom from 'yet-another-react-lightbox/plugins/zoom'
import Counter from 'yet-another-react-lightbox/plugins/counter'
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails'
import { InfiniteFeed } from '../../../.claude/skills/react-fetch-cache-patterns/assets/templates/infinite-feed.template';

interface GalleryImage {
    id: string,
    url: string
}

interface Props {
    images: GalleryImage[],
    alt: string
}

export default function ProductImageGallery({ images, alt }: Props) {
    const [open, setOpen] = useState(false);
    const [index, setIndex] = useState(0);

    if (images.length === 0) {
        return (
            <div className="flex h-50 w-full items-center justify-center rounded-2xl bd-muted text-sm text-muted-foreground">
                Sin imagen
            </div>
        )
    }

    return (
        <>
            <button
                type="button"
                onClick={() => {
                    setIndex(0)
                    setOpen(true)
                }}
                aria-label={`Ver ${images.length} imagenes de ${alt}`}
                className="group relative block h-50 w-full cursro-zoom-in overflow-hidden rounded-2xl"
            >
                <Image
                    src={images[0].url}
                    alt={alt}
                    fill
                    sizes="(max-width: 768px) 100vw 400px"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {
                    <span className="absolute right-2 bottom-2 rounded-full bg-black/70 px-2 py-1 text-xs font-medium text-white">
                        {images.length} foto{images.length != 1 ? 's' : ''}
                    </span>
                }
            </button>
            <Lightbox
                open={open}
                close={() => setOpen(false)}
                index={index}
                slides={images.map(({ url }) => ({ src: url, alt }))}
                plugins={[Zoom, Thumbnails, Counter]}
                on={{ 
                    view: ({ index: current }) => setIndex(current),
                    exited: () => setIndex(0)
                }}
                zoom={{ maxZoomPixelRatio: 2, scrollToZoom: true }}             
                // thumbnails={{ 
                //     position: 'bottom',
                //     width: 64,
                //     height: 56,
                //     gap: 8,
                //     padding: 2,
                //     borderRadius: 6,
                //     border: 2,
                // }}
                counter={{ container: { style: { fontSize: '20px', } } }}
                controller={{ closeOnBackdropClick: true }}
                carousel={{ imageFit: 'contain', padding: '1px' }}
                animation={{ fade: 200, swipe: 300 }}
                labels={{ 
                    Close: 'Cerrar',
                    Next: 'Siguiente',
                    Previous: 'Cargando',
                }}                
            />
        </>
    )
}
