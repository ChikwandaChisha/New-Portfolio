import { useEffect, useRef, type ReactNode } from 'react';
import { ArrowLeft, ArrowUpRight, Github } from 'lucide-react';
import { ScrollReveal } from '@/components/ScrollReveal';
import { StaggerContainer, StaggerItem } from '@/components/StaggerContainer';
import { goToSection } from '@/utils/smoothScroll';

interface Stage {
  step: string;
  name: string;
  body: string;
}

interface ProjectContent {
  eyebrow: string;
  title: string;
  summary: string;
  meta: { label: string; value: string }[];
  github?: string;
  overview: string[];
  flow: string[];
  stages: Stage[];
  foundation: string;
  highlights: string[];
  usage: string;
  stack: string[];
}

const CONTENT: Record<string, ProjectContent> = {
  'search-engine': {
    eyebrow: 'Systems · C',
    title: 'Search Engine',
    summary:
      'A three-stage information-retrieval pipeline written from scratch in C: a web crawler that walks a bounded set of pages, an indexer that turns them into an inverted index, and a querier that answers ranked Boolean searches over that index.',
    meta: [
      { label: 'Type', value: 'Individual project' },
      { label: 'Language', value: 'C · custom libengine' },
      { label: 'Interface', value: 'Command line' },
      { label: 'Build', value: 'Make' },
    ],
    github: 'https://github.com/ChikwandaChisha/Search-Engine',
    overview: [
      'The project implements a classic search-engine pipeline from the ground up in C. Rather than lean on a framework, each stage is a standalone command-line program that reads the previous stage’s output, so the crawler, indexer, and querier can each be built, tested, and reasoned about in isolation.',
      'It runs on a small set of custom data structures (hashtables, sets, counters, and a bag) that keep lookups and de-duplication fast with no external dependencies. Disciplined manual memory management and defensive error handling run through every module.',
      'It also ships as a self-contained local demo. A single script serves a bundled test site, crawls it, builds the index, and drops you into the querier, so the whole engine runs offline with no external server.',
    ],
    flow: ['Crawl', 'Index', 'Query'],
    stages: [
      {
        step: '01',
        name: 'Crawler',
        body: 'Starts from a seed URL and explores outward breadth-first up to a maximum depth. It stays within a single allowed domain, normalizes and de-duplicates every URL it discovers, and writes each fetched page (its URL, crawl depth, and raw HTML) to a page directory for the next stage.',
      },
      {
        step: '02',
        name: 'Indexer',
        body: 'Reads the crawler’s saved pages, extracts and normalizes words (lowercased, minimum length), and builds an inverted index: a map from each word to the documents that contain it and how many times. The index is serialized to a file so it can be rebuilt and validated independently.',
      },
      {
        step: '03',
        name: 'Querier',
        body: 'Loads the inverted index and answers Boolean queries combining “and” / “or”, with “and” binding tighter than “or”. Matching documents are scored (and-sequences by their smallest match count, or by the sum) and printed ranked by score alongside their URLs.',
      },
    ],
    foundation:
      'A shared common layer holds the page-directory, index, and word-normalization helpers used by all three programs, on top of libengine: a small custom library of data structures and web utilities (hashtable, set, counters, bag, webpage).',
    highlights: [
      'Domain-bounded, depth-limited breadth-first crawl with URL de-duplication, tuned for faster crawling.',
      'Inverted index built on average-constant-time hashtable lookups.',
      'Boolean query parser with and/or precedence and ranked scoring.',
      'Runs fully offline with one command: a script serves a bundled test site, then crawls, indexes, and opens the querier.',
      'Helper scripts mirror any static website locally so you can crawl real content offline.',
      'Layered design: three composable CLI programs over one shared library, with defensive error handling and careful manual memory management throughout.',
    ],
    usage: `# one command: serve a bundled test site, then crawl, index, and query
./run.sh                 # crawl the bundled "bigsite" at depth 2
./run.sh mock_website 1  # or the small 3-page site

# or run each stage by hand
./crawler/crawler <seedURL> <pageDirectory> <maxDepth>
./indexer/indexer <pageDirectory> <indexFile>
./querier/querier <pageDirectory> <indexFile>`,
    stack: ['C', 'Make', 'Bash', 'Inverted Index', 'Hashtables', 'BFS Crawl'],
  },
};

function BackLink() {
  return (
    <a
      href="#projects"
      onClick={(e) => {
        e.preventDefault();
        goToSection('#projects');
      }}
      className="inline-flex items-center gap-2 label-mono text-muted-foreground transition-colors hover:text-foreground"
    >
      <ArrowLeft size={14} aria-hidden="true" />
      <span>Back to projects</span>
    </a>
  );
}

export function ProjectDetail({ slug }: { slug: string }) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const content = CONTENT[slug];

  useEffect(() => {
    window.scrollTo(0, 0);
    headingRef.current?.focus();
  }, [slug]);

  if (!content) {
    return (
      <section className="max-w-3xl mx-auto px-5 sm:px-8 pt-32 pb-24">
        <p className="label-mono text-accent">Not found</p>
        <h1
          ref={headingRef}
          tabIndex={-1}
          className="mt-4 text-3xl font-semibold tracking-tight outline-none"
        >
          That project doesn’t exist
        </h1>
        <p className="mt-4 text-muted-foreground">
          The project you’re looking for isn’t here.
        </p>
        <div className="mt-8">
          <BackLink />
        </div>
      </section>
    );
  }

  return (
    <article className="max-w-3xl mx-auto px-5 sm:px-8 pt-28 sm:pt-32 pb-24">
      <ScrollReveal>
        <BackLink />

        <p className="mt-8 label-mono text-accent">{content.eyebrow}</p>
        <h1
          ref={headingRef}
          tabIndex={-1}
          className="mt-3 text-4xl sm:text-5xl font-semibold tracking-tight outline-none"
        >
          {content.title}
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{content.summary}</p>

        {/* Meta */}
        <dl className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-px border border-border rounded-sm bg-border overflow-hidden">
          {content.meta.map((m) => (
            <div key={m.label} className="bg-card px-4 py-3">
              <dt className="label-mono text-muted-foreground/70">{m.label}</dt>
              <dd className="mt-1 text-sm text-foreground">{m.value}</dd>
            </div>
          ))}
        </dl>

        {content.github && (
          <div className="mt-6">
            <a
              href={content.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 border border-border rounded-sm px-4 py-2 text-sm text-foreground transition-colors hover:border-accent hover:text-accent"
            >
              <Github size={16} aria-hidden="true" />
              <span>View source on GitHub</span>
              <ArrowUpRight
                size={15}
                aria-hidden="true"
                className="text-muted-foreground transition-colors group-hover:text-accent"
              />
            </a>
          </div>
        )}
      </ScrollReveal>

      {/* Overview */}
      <Section index="01" title="Overview">
        <div className="space-y-4 text-[15px] leading-relaxed text-muted-foreground">
          {content.overview.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>
      </Section>

      {/* Architecture */}
      <Section index="02" title="Architecture">
        <div
          className="flex flex-wrap items-center gap-2 label-mono text-muted-foreground"
          aria-hidden="true"
        >
          {content.flow.map((f, i) => (
            <span key={f} className="flex items-center gap-2">
              <span className="border border-border rounded-sm px-3 py-1 text-foreground">{f}</span>
              {i < content.flow.length - 1 && <span className="text-accent">→</span>}
            </span>
          ))}
        </div>

        <StaggerContainer className="mt-8 border-t border-border">
          {content.stages.map((stage) => (
            <StaggerItem key={stage.step}>
              <div className="grid grid-cols-[auto_1fr] gap-x-4 sm:gap-x-8 py-6 border-b border-border">
                <span className="label-mono text-accent pt-1">{stage.step}</span>
                <div>
                  <h3 className="text-lg font-semibold tracking-tight text-foreground">
                    {stage.name}
                  </h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
                    {stage.body}
                  </p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <p className="mt-6 text-sm leading-relaxed text-muted-foreground/90">
          {content.foundation}
        </p>
      </Section>

      {/* Highlights */}
      <Section index="03" title="Engineering highlights">
        <ul className="space-y-3">
          {content.highlights.map((h) => (
            <li key={h} className="flex gap-3 text-[15px] leading-relaxed text-muted-foreground">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
              <span>{h}</span>
            </li>
          ))}
        </ul>
      </Section>

      {/* Build & run */}
      <Section index="04" title="Build & run">
        <p className="text-[15px] leading-relaxed text-muted-foreground">
          After a single <span className="font-mono text-foreground">make</span>, the whole engine
          runs offline. One script serves a bundled test site and walks it through the full pipeline,
          or you can run each stage by hand:
        </p>
        <div className="mt-5 overflow-x-auto border border-border rounded-sm bg-card">
          <pre className="p-5 text-[13px] leading-relaxed font-mono text-foreground">
            <code>{content.usage}</code>
          </pre>
        </div>
      </Section>

      {/* Stack */}
      <Section index="05" title="Stack">
        <div className="flex flex-wrap gap-2">
          {content.stack.map((t) => (
            <span
              key={t}
              className="font-mono text-[12px] text-muted-foreground border border-border rounded-sm px-2.5 py-1"
            >
              {t}
            </span>
          ))}
        </div>
      </Section>

      <div className="mt-16 pt-8 border-t border-border">
        <BackLink />
      </div>
    </article>
  );
}

function Section({
  index,
  title,
  children,
}: {
  index: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <ScrollReveal className="mt-16">
      <div className="flex items-center gap-4">
        <span className="label-mono text-accent">{index}</span>
        <span className="h-px flex-1 bg-border" aria-hidden="true" />
      </div>
      <h2 className="mt-5 text-2xl font-semibold tracking-tight text-foreground">{title}</h2>
      <div className="mt-6">{children}</div>
    </ScrollReveal>
  );
}
