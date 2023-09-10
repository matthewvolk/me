export const BigExecCodeSample = async () => {
  const leader = <span className="text-green-400">➜</span>;
  const tilde = <span className="text-teal-300">~</span>;
  const cmd = <span className="text-white">npx bigexec</span>;

  const qmark = <span className="text-green-400">?</span>;
  const question = (
    <span className="text-white">What would you like to do today?</span>
  );
  const help = <span className="text-slate-400">(Use arrow keys)</span>;

  const create = (
    <span className="text-teal-300">
      &gt; Create a Headless Storefront Channel
    </span>
  );
  const quit = <span className="text-slate-400">{"  "}Quit</span>;

  const ellipses = <span className="text-slate-400">{"  "}...</span>;

  const confirm = (
    <span className="bigexec-loading text-green-400">
      {"  "}Great! Sit back while we create your channel
    </span>
  );

  return (
    <div className="relative min-w-0 rounded-xl bg-slate-950 dark:border dark:border-slate-700 sm:w-full sm:max-w-xl lg:w-full lg:max-w-none">
      <div className="absolute left-8 top-8 flex gap-1.5">
        <div className="h-3.5 w-3.5 rounded-full bg-red-500" />
        <div className="h-3.5 w-3.5 rounded-full bg-yellow-400" />
        <div className="h-3.5 w-3.5 rounded-full bg-green-500" />
      </div>
      <div className="overflow-x-auto overscroll-x-contain p-8 font-mono">
        <pre className="mt-10 w-fit font-bold">
          <span className="mb-6 flex items-center gap-4">
            {leader} {tilde} {cmd}
          </span>
          <span className="mb-4 flex items-center gap-4">
            {qmark} {question} {help}
          </span>
          <span className="flex items-center gap-4">{create}</span>
          <span className="mb-4 flex items-center gap-4">{quit}</span>
          <span className="mb-4 flex items-center gap-4">{ellipses}</span>
          <span className="mb-16 flex items-center gap-4">{confirm}</span>
        </pre>
      </div>
    </div>
  );
};
