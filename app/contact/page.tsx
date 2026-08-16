import Image from "next/image";
import { Mail, MessageCircle, Send } from "lucide-react";
import { Reveal } from "@/components/motion";

export const metadata = {
  title: "联系我"
};

export default function ContactPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-7xl items-center px-5 py-32 md:px-8">
      <section className="grid w-full gap-14 md:grid-cols-[1.1fr_0.9fr] md:items-end">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.26em] text-muted md:tracking-[0.3em]">Contact</p>
          <h1 className="mt-5 max-w-4xl text-4xl font-medium leading-tight md:text-6xl lg:text-7xl">
            让我们探讨结构、材料、产品体验与摄影摄像吧
          </h1>
          <div className="mt-10 space-y-5 border-t border-line pt-8">
            <a href="mailto:EsRegnet911@gmail.com" className="flex items-center gap-4 text-base hover:text-muted md:text-lg">
              <Mail size={20} /> EsRegnet911@gmail.com
            </a>
            <p className="flex items-center gap-4 text-base text-ink/72 md:text-lg">
              <MessageCircle size={20} /> WeChat: MY911701
            </p>
            <p className="flex items-center gap-4 text-base text-ink/72 md:text-lg">
              <Send size={20} /> Instagram:kaminari9111
            </p>
          </div>
        </Reveal>
        <Reveal delay={0.12}>
          <div className="w-full max-w-sm border border-line bg-white/46 p-6">
            <div className="relative aspect-square overflow-hidden bg-neutral-200">
              <Image
                src="/images/avatar/wechat-qr.jpg"
                alt="王志华微信二维码"
                fill
                sizes="(min-width: 768px) 320px, 100vw"
                className="object-contain"
              />
            </div>
            <p className="mt-5 text-sm leading-7 text-muted">扫码添加微信，欢迎交流包装结构设计、产品设计与视觉表现相关合作。</p>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
