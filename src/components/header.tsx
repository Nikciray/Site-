import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import { Menu } from "lucide-react";
import { atom } from "@reatom/core";
import { reatomComponent } from "@reatom/npm-react";
import { pageContextAtom } from "@/lib/global.model";

interface TabProps {
  text: string;
  value: string
}

const Tab = reatomComponent<TabProps>(({ text, value, ctx }) => {
  const pathname = ctx.spy(pathnameAtom);

  const isSelected = pathname === value

  return (
    <a
      href={value}
      onClick={() => pathnameAtom(ctx, value)}
      className={cn(
        "relative rounded-2xl px-3 py-0.5 font-medium text-[#2d2d2d] text-base text-center hover:text-[#106cec] transition-colors",
        isSelected ? "" : "",
      )}
    >
      <p className="relative z-50 min-w-20">{text}</p>
      {isSelected && (
        <motion.span
          layoutId="tabs"
          transition={{ type: "spring", duration: 0.5 }}
          className="absolute inset-0 rounded-2xl bg-black/10"
        />
      )}
    </a>
  );
}, "Tab")

const TABS = [
  { title: "Каталог квартир", value: "/booking" },
  { title: "Отзывы", value: "/#reviews-section" },
  { title: "О нас", value: "/#about" },
]

pageContextAtom.onChange((ctx, state) => {
  if (!state) return;
  pathnameAtom(ctx, state.urlParsed.pathname)
})

const pathnameAtom = atom("/")

const NavTabs = reatomComponent<{ tabs: typeof TABS }>(({ tabs, ctx }) => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-6 lg:gap-9">
      {tabs.map((tab) => (
        <Tab
          value={tab.value}
          text={tab.title}
          key={tab.value}
        />
      ))}
    </div>
  );
})

export const Header = () => {
  return (
    <header
      className="    fixed left-1/2 top-8 z-50 transform
    -translate-x-1/2 w-[calc(100%-40px)] max-w-[1270px] h-[47px]
    flex items-center justify-center
    bg-white/80 backdrop-blur rounded-full transition-all"
      style={{ boxShadow: '0 6px 32px 0 rgba(0,0,0,0.10)' }}
    >
      <nav className="w-full gap-3 flex items-center justify-between px-[18px] h-full">
        <a
          href="/"
          className="w-8 h-8 bg-[#e0e0e0] rounded-full mr-4 flex-shrink-0"
        />
        <div className="flex items-center justify-center gap-16 flex-1 min-w-0">
          <div className="hidden md:block">
            <NavTabs tabs={TABS} />
          </div>
          <div className="flex w-full justify-end items-center md:hidden h-full">
            <Sheet>
              <SheetTrigger
                className="flex hover:bg-[#106cec] hover:text-white items-center justify-center h-[31px] aspect-square w-[31px] rounded-2xl 
              border cursor-pointer border-[#222]"
              >
                <Menu size={16} />
              </SheetTrigger>
              <SheetContent side="top" className="p-5">
                <SheetHeader className="hidden">
                  <SheetTitle></SheetTitle>
                </SheetHeader>
                <div className="flex flex-col items-center justify-center gap-2 w-full h-full">
                  {TABS.map((tab) => (
                    <Tab
                      value={tab.value}
                      text={tab.title}
                      key={tab.value}
                    />
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
        <button
          className="inline-flex cursor-pointer items-center justify-center border border-[#222] rounded-[16px] 
            h-[31px] w-[83px] px-0 font-medium text-[#222] text-[16px] leading-none
            transition-colors duration-200 bg-transparent focus:outline-none hover:bg-[#106cec] hover:text-white hover:border-transparent"
        >
          Войти
        </button>
      </nav>
    </header>
  );
}