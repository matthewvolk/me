import { BigRequestCodeSampleDialog } from "./bigrequest-code-sample-dialog";
import {
  TooltipProvider,
  TooltipContent,
  Tooltip,
  TooltipTrigger,
} from "./ui/tooltip";

const imp = <span className="mr-2 italic text-[#89DDFF]">import</span>;
const br = <span className="mr-2 text-[#BABED8]">bigrequest</span>;
const fr = <span className="mr-2 italic text-[#89DDFF]">from</span>;
const lq = <span className="text-[#89DDFF]">&quot;</span>;
const bri = <span className="text-[#C3E88D]">bigrequest</span>;
const rq = <span className="text-[#89DDFF]">&quot;&#59;</span>;

const cst = <span className="mr-2 text-[#C792EA]">const</span>;
const b = <span className="mr-2 text-[#BABED8]">bc</span>;
const eq = <span className="mr-2 text-[#89DDFF]">&#61;</span>;
const cbr = <span className="text-[#BABED8]">bigrequest</span>;
const p = <span className="text-[#89DDFF]">.</span>;
const rst = <span className="text-[#82AAFF]">rest</span>;
const lp = <span className="text-[#BABED8]">&#40;</span>;
const lc = <span className="text-[#89DDFF]">&#123;</span>;

const sh = <span className="text-[#F07178]">storeHash</span>;
const co = <span className="mr-2 text-[#89DDFF]">&#58;</span>;
const ysh = <span className="text-[#C3E88D]">your_store_hash</span>;
const cm = <span className="text-[#89DDFF]">&#44;</span>;

const at = <span className="text-[#F07178]">accessToken</span>;
const yat = <span className="text-[#C3E88D]">your_access_token</span>;

const rc = <span className="text-[#89DDFF]">&#125;</span>;
const rp = <span className="text-[#BABED8]">&#41;</span>;
const sm = <span className="text-[#89DDFF]">&#59;</span>;

const pro = <span className="mr-2 text-[#BABED8]">product</span>;
const aw = <span className="mr-2 italic text-[#89DDFF]">await</span>;
const cli = <span className="text-[#BABED8]">bc</span>;
const v3 = <span className="text-[#BABED8]">v3</span>;
const get = <span className="text-[#82AAFF]">GET</span>;
const pt = (
  <span className="text-[#C3E88D]">
    /catalog/products/&#123;product_id&#125;
  </span>
);

const pr = <span className="text-[#F07178]">params</span>;

const hd = <span className="text-[#F07178]">header</span>;
const ac = <span className="ml-2 text-[#F07178]">Accept</span>;
const aj = <span className="text-[#C3E88D]">application/json</span>;

const ph = <span className="text-[#F07178]">path</span>;
const pi = <span className="ml-2 text-[#F07178]">product_id</span>;

const id = <span className="text-[#F78C6C]">111</span>;

export const BigRequestCodeSample = async () => (
  <div
    id="shiki"
    className="relative min-w-0 rounded-xl bg-slate-950 dark:border dark:border-slate-700 sm:w-full sm:max-w-xl lg:w-full lg:max-w-none"
  >
    <div className="absolute left-8 top-8 flex gap-1.5">
      <div className="h-3.5 w-3.5 rounded-full bg-red-500" />
      <div className="h-3.5 w-3.5 rounded-full bg-yellow-400" />
      <div className="h-3.5 w-3.5 rounded-full bg-green-500" />
    </div>
    <div className="overflow-x-auto overscroll-x-contain p-8 font-semibold">
      <pre className="mb-4 mt-10">
        {/* prettier-ignore */}
        <span className="flex mb-4">
            {imp} {br} {fr} {lq}{bri}{rq}
          </span>
        {/* prettier-ignore */}
        <span className="flex">
            {cst} {b} {eq} {cbr}{p}{rst}{lp}{lc}
          </span>
        {/* prettier-ignore */}
        <span className="flex ml-4">
            {sh}{co} {lq}{ysh}{lq}{cm}
          </span>
        {/* prettier-ignore */}
        <span className="flex ml-4">
            {at}{co} {lq}{yat}{lq}{cm}
          </span>
        {/* prettier-ignore */}
        <span className="flex mb-4">
            {rc}{rp}{sm}
          </span>
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <BigRequestCodeSampleDialog>
              <TooltipTrigger asChild>
                <div
                  className="relative -ml-2 w-fit min-w-full border-2 border-dashed border-slate-500 p-2"
                  role="button"
                >
                  {/* prettier-ignore */}
                  <span className="flex">
                      {cst} {pro} {eq} {aw} {cli}{p}{v3}{p}{get}{lp}
                    </span>
                  {/* prettier-ignore */}
                  <span className="flex ml-4">
                      {lq}{pt}{lq}{cm}
                    </span>
                  {/* prettier-ignore */}
                  <span className="flex ml-4">
                      {lc}
                    </span>
                  {/* prettier-ignore */}
                  <span className="flex ml-8">
                      {pr}{co} {lc}
                    </span>
                  {/* prettier-ignore */}
                  <span className="flex ml-12">
                      {hd}{co} {lc} {ac}{co} {lq}{aj}{lq}&nbsp;{rc}{cm}
                    </span>
                  {/* prettier-ignore */}
                  <span className="flex ml-12">
                      {ph}{co} {lc} {pi}{co}&nbsp;{id}&nbsp;{rc}{cm}
                    </span>
                  {/* prettier-ignore */}
                  <span className="flex ml-8">
                      {rc}{cm}
                    </span>
                  {/* prettier-ignore */}
                  <span className="flex ml-4">
                      {rc}{cm}
                    </span>
                  {/* prettier-ignore */}
                  <span className="flex">
                      {rp}{sm}
                    </span>
                </div>
              </TooltipTrigger>
            </BigRequestCodeSampleDialog>
            <TooltipContent
              align="start"
              alignOffset={24}
              className="rounded-xl border-2 border-slate-700 bg-slate-950 text-slate-200"
            >
              <pre className="p-2 font-mono text-base font-semibold">
                {`product: {
  id: number;
  name: string;
  type: "physical" | "digital";
  sku?: string;
  // etc.
}`}
              </pre>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </pre>
    </div>
  </div>
);
