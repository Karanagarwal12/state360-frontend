'use client'

import { useEffect, useState } from 'react'
import social_data from "../../data/social_share_data.json"
// import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
// import { Input } from '@/components/ui/input'

import {
    FacebookShareButton,
    LinkedinShareButton,
    TwitterShareButton,
    WhatsappShareButton,
    EmailShareButton,
    FacebookIcon,
    LinkedinIcon,
    TwitterIcon,
    WhatsappIcon,
    EmailIcon,
} from 'react-share'
import { Button } from '@/components/ui'
import Image from 'next/image'

export default function ShareDialog() {
    const [copied, setCopied] = useState(false)
    const url = typeof window !== 'undefined' ? window.location.href : ''
    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(url)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        } catch (err) {
            console.error('Failed to copy:', err)
        }
    }

  
    return (
        <Dialog>
            <DialogTrigger asChild>
                <button
                    className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-3 sm:py-3 sm:px-4 md:px-8 rounded m-1 sm:m-4"
                >
                    SHARE NOW
                </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <Image className=' mx-auto' alt='HackoFiesta 6.0 AISpire' src={"/image/title_top.png"} height={300} width={300} />
                    <DialogTitle>Socials</DialogTitle>
                </DialogHeader>
                <div className="flex flex-wrap gap-4 mb-6 justify-center">
                    {/* <FacebookShareButton url={url} quote="Check out this website!">
            <FacebookIcon size={48} round />
          </FacebookShareButton> */}
                    <LinkedinShareButton url={url} title={social_data.linkedin.title} summary={social_data.linkedin.summary}>
                        <LinkedinIcon size={48} round />
                    </LinkedinShareButton>
                    <TwitterShareButton url={url} title={social_data.twitter.title}>
                        <TwitterIcon size={48} round />
                    </TwitterShareButton>
                    <WhatsappShareButton url={url} title={social_data.whatsapp.title}>
                        <WhatsappIcon size={48} round />
                    </WhatsappShareButton>
                    <EmailShareButton url={url} subject={social_data.email.title} body={social_data.email.summary}>
                        <EmailIcon size={48} round />
                    </EmailShareButton>
                </div>
                <div className="flex items-center space-x-2">
                    <div className="grid flex-1 gap-2">
                        <input
                            id="link"
                            value={url}
                            readOnly
                            className="h-9 text-black bg-white p-2 rounded-md border border-gray-900"
                        />
                    </div>
                    <Button
                        type="submit"
                        size="sm"
                        className="px-3"
                        onClick={handleCopy}
                    >
                        {copied ? 'Copied!' : 'Copy'}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
