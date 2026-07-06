import { useEffect, useRef, useState, type ReactNode } from 'react';
import { ArrowLeft, ArrowUpRight, Github, X } from 'lucide-react';
import { ScrollReveal } from '@/components/ScrollReveal';
import { StaggerContainer, StaggerItem } from '@/components/StaggerContainer';
import { goToSection } from '@/utils/smoothScroll';

interface Stage {
  step: string;
  name: string;
  body: string;
}

/** A case study is an ordered list of typed content blocks, so each project can
 *  pick the sections that actually fit it (a CLI pipeline, a security model, or a
 *  research comparison) while sharing one visual language. */
type Block =
  | { kind: 'prose'; index: string; title: string; body: string[] }
  | { kind: 'stages'; index: string; title: string; intro?: string; flow?: string[]; stages: Stage[]; note?: string }
  | { kind: 'bullets'; index: string; title: string; items: string[] }
  | { kind: 'code'; index: string; title: string; intro?: string; code: string }
  | {
      kind: 'table';
      index: string;
      title: string;
      intro?: string;
      columns: string[];
      rows: string[][];
      monoCols?: number[];
      note?: string;
    }
  | { kind: 'gallery'; index: string; title: string; images: { src: string; alt: string; caption: string }[] }
  | { kind: 'tags'; index: string; title: string; items: string[] };

interface ProjectContent {
  eyebrow: string;
  title: string;
  summary: string;
  meta: { label: string; value: string }[];
  github?: string;
  demo?: string;
  blocks: Block[];
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
    blocks: [
      {
        kind: 'prose',
        index: '01',
        title: 'Overview',
        body: [
          'The project implements a classic search-engine pipeline from the ground up in C. Rather than lean on a framework, each stage is a standalone command-line program that reads the previous stage’s output, so the crawler, indexer, and querier can each be built, tested, and reasoned about in isolation.',
          'It runs on a small set of custom data structures (hashtables, sets, counters, and a bag) that keep lookups and de-duplication fast with no external dependencies. Disciplined manual memory management and defensive error handling run through every module.',
          'It also ships as a self-contained local demo. A single script serves a bundled test site, crawls it, builds the index, and drops you into the querier, so the whole engine runs offline with no external server.',
        ],
      },
      {
        kind: 'stages',
        index: '02',
        title: 'Architecture',
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
        note: 'A shared common layer holds the page-directory, index, and word-normalization helpers used by all three programs, on top of libengine: a small custom library of data structures and web utilities (hashtable, set, counters, bag, webpage).',
      },
      {
        kind: 'bullets',
        index: '03',
        title: 'Engineering highlights',
        items: [
          'Domain-bounded, depth-limited breadth-first crawl with URL de-duplication, tuned for faster crawling.',
          'Inverted index built on average-constant-time hashtable lookups.',
          'Boolean query parser with and/or precedence and ranked scoring.',
          'Runs fully offline with one command: a script serves a bundled test site, then crawls, indexes, and opens the querier.',
          'Helper scripts mirror any static website locally so you can crawl real content offline.',
          'Layered design: three composable CLI programs over one shared library, with defensive error handling and careful manual memory management throughout.',
        ],
      },
      {
        kind: 'code',
        index: '04',
        title: 'Build & run',
        intro:
          'After a single make build, the whole engine runs offline. One script serves a bundled test site and walks it through the full pipeline, or you can run each stage by hand:',
        code: `# one command: serve a bundled test site, then crawl, index, and query
./run.sh                 # crawl the bundled "bigsite" at depth 2
./run.sh mock_website 1  # or the small 3-page site

# add any static site: mirror it locally, then crawl, index, and query
./add.sh <url> [name] [depth]   # depth defaults to 1

# or run each stage by hand
./crawler/crawler <seedURL> <pageDirectory> <maxDepth>
./indexer/indexer <pageDirectory> <indexFile>
./querier/querier <pageDirectory> <indexFile>`,
      },
      {
        kind: 'tags',
        index: '05',
        title: 'Stack',
        items: ['C', 'Make', 'Bash', 'Inverted Index', 'Hashtables', 'BFS Crawl'],
      },
    ],
  },

  cryptnote: {
    eyebrow: 'Full Stack · Security',
    title: 'CryptNote',
    summary:
      'An end-to-end encrypted messaging platform built around three security pillars: RSA message encryption, role-based access control enforced by database row-level security, and tamper-evident audit logging, with moderation tools for flagged content.',
    meta: [
      { label: 'Frontend', value: 'React · TypeScript' },
      { label: 'Backend', value: 'Supabase · Postgres' },
      { label: 'Encryption', value: 'RSA-2048' },
      { label: 'Access', value: 'RBAC + RLS' },
    ],
    github: 'https://github.com/ChikwandaChisha/CryptNote',
    blocks: [
      {
        kind: 'prose',
        index: '01',
        title: 'Overview',
        body: [
          'CryptNote is an end-to-end encrypted messaging platform where a message can only ever be read by its intended recipient. Every user gets an RSA key pair: the public key lives in the database, the private key stays on the client, and messages are encrypted in the browser before they are ever sent to the server.',
          'On top of encryption, it enforces who can do what. Three roles (user, moderator, and admin) are backed by PostgreSQL row-level security policies, so access rules live in the database rather than being trusted to the UI. Moderators get a dedicated panel to review content that users have flagged.',
          'Abuse is handled without breaking privacy. Each message carries a security token that a moderator can freeze to cut off a sender, and every sensitive action is written to an immutable, tamper-evident audit log that records who did what and when, but never the message contents.',
        ],
      },
      {
        kind: 'stages',
        index: '02',
        title: 'Architecture',
        flow: ['Encrypt', 'Send', 'Decrypt'],
        stages: [
          {
            step: '01',
            name: 'End-to-end encryption',
            body: 'Each user has an RSA-2048 key pair. Public keys are stored in the database and fetched to encrypt a message, while the matching private key never leaves the client. Messages are encrypted before they reach the server and can only be decrypted by the recipient, so the platform itself never sees plaintext.',
          },
          {
            step: '02',
            name: 'Role-based access control',
            body: 'Users, moderators, and admins have distinct permissions. Rather than trust the frontend, access is enforced with PostgreSQL row-level security policies, so each account can only read and write the rows it is entitled to. Moderators can review flagged messages that regular users cannot.',
          },
          {
            step: '03',
            name: 'Moderation & audit',
            body: 'Users can flag inappropriate messages for review, and each message is tied to a security token a moderator can freeze to stop further abuse. Every sensitive action is recorded in an append-only audit log with timestamps and actor IDs, deliberately excluding message content to preserve privacy.',
          },
        ],
        note: 'Supabase provides authentication, the PostgreSQL database, and real-time subscriptions for instant delivery, while row-level security policies and SQL functions for public-key storage keep the trust boundary in the database. The frontend is a Vite and React app styled with Tailwind and shadcn/ui, with React Query managing server state.',
      },
      {
        kind: 'bullets',
        index: '03',
        title: 'Engineering highlights',
        items: [
          'RSA-2048 end-to-end encryption with per-user key pairs; private keys never leave the client.',
          'Role-based access control (user, moderator, admin) enforced by PostgreSQL row-level security.',
          'Anonymous messaging with real-time delivery over Supabase subscriptions.',
          'Flagging and moderation workflow with freezable per-message security tokens.',
          'Immutable, tamper-evident audit log that records actions without logging message content.',
          'Typed React and TypeScript frontend over a fully managed Supabase backend.',
        ],
      },
      {
        kind: 'code',
        index: '04',
        title: 'Build & run',
        intro:
          'The frontend is a Vite and React app and the backend is fully managed by Supabase, so a local copy takes only an install and a dev server:',
        code: `# clone and install
git clone https://github.com/ChikwandaChisha/CryptNote
cd CryptNote
npm install

# start the dev server (Supabase config ships with the repo)
npm run dev`,
      },
      {
        kind: 'tags',
        index: '05',
        title: 'Stack',
        items: ['React', 'TypeScript', 'Supabase', 'PostgreSQL', 'Tailwind CSS', 'RSA'],
      },
    ],
  },

  'swahili-toxicity-detection': {
    eyebrow: 'AI · ML',
    title: 'Swahili Toxicity Detection',
    summary:
      'A three-class Swahili toxicity-detection system built on 48,000+ annotated tweets, comparing TF-IDF SVM and Naive Bayes classifiers against a multilingual transformer and a zero-shot LLM. The Linear SVM reached the strongest macro-F1 (0.486), and error analysis showed that severe class imbalance was what made offensive and hate-speech detection hard for every model.',
    meta: [
      { label: 'Task', value: '3-class classification' },
      { label: 'Dataset', value: '48,000+ tweets' },
      { label: 'Best macro-F1', value: '0.486 · Linear SVM' },
      { label: 'Language', value: 'Swahili · code-switched' },
    ],
    blocks: [
      {
        kind: 'prose',
        index: '01',
        title: 'Overview',
        body: [
          'Content-moderation systems work far better in English than in lower-resource African languages like Swahili, where slang, code-switching, spelling variation, and cultural context all trip up models trained on English. This project set out to build and compare NLP systems that classify Swahili social-media posts as neutral, offensive, or hate speech.',
          'The guiding question was how well three very different approaches (traditional machine learning, a multilingual transformer, and a large language model) could detect toxicity in Swahili text, and in particular which of them held up on the rare but most important classes.',
        ],
      },
      {
        kind: 'table',
        index: '02',
        title: 'Dataset & the imbalance problem',
        intro:
          'The work used the HateSpeech_Kenya dataset: over 48,000 Swahili and Swahili-English tweets, each labeled by at least three annotators with the majority vote taken as the final label (0 neutral, 1 offensive, 2 hate speech).',
        columns: ['Class', 'Tweets', 'Share'],
        monoCols: [1, 2],
        rows: [
          ['Neutral / neither', '36,300+', '~75%'],
          ['Offensive', '8,543', '~18%'],
          ['Hate speech', '3,181', '~7%'],
        ],
        note: 'Roughly three-quarters of the data is neutral and under 7% is hate speech, so a model can reach over 70% accuracy while barely detecting toxicity at all. That imbalance is why macro-F1, which weights all three classes equally, became the metric that actually mattered.',
      },
      {
        kind: 'stages',
        index: '03',
        title: 'Approach',
        intro:
          'Every tweet was cleaned for social-media noise (usernames, URLs, numbers, and non-letter characters), lowercased for the traditional models, and dropped if it was too short. The data was then split 80/20 with stratified sampling so the class ratios held in both sets. Four model families were compared:',
        flow: ['Clean', 'Lowercase', 'Filter', 'Stratified 80/20'],
        stages: [
          {
            step: '01',
            name: 'TF-IDF + Linear SVM',
            body: 'TF-IDF features (about 5,000 terms) feeding a LinearSVC with class weighting. It learned decision boundaries between the three classes and turned out to be the strongest and most balanced traditional model.',
          },
          {
            step: '02',
            name: 'Multinomial Naive Bayes',
            body: 'A fast probabilistic baseline over the same text features. It reached high overall accuracy in some runs but leaned heavily on the neutral class and almost never caught hate speech.',
          },
          {
            step: '03',
            name: 'XLM-RoBERTa',
            body: 'A multilingual transformer fine-tuned for three-class classification, with up to 10 epochs, early stopping, and class-weighting experiments. Its multilingual pretraining was expected to understand Swahili, but it proved sensitive to the class imbalance and prone to overfitting.',
          },
          {
            step: '04',
            name: 'Zero-shot LLM',
            body: 'A GPT-style model prompted to label a tweet as neutral, offensive, or hate speech with no task-specific training. It served as an exploratory baseline, evaluated on a small sample because of API and cost limits.',
          },
        ],
      },
      {
        kind: 'table',
        index: '04',
        title: 'Results',
        intro:
          'Metrics came from several experimental runs and configurations, so they read best as a comparison rather than one controlled benchmark.',
        columns: ['Model', 'Accuracy', 'Macro-F1', 'Notes'],
        monoCols: [1, 2],
        rows: [
          ['TF-IDF + Linear SVM', '~0.70', '0.486', 'Best balanced result'],
          ['Multinomial Naive Bayes', '~0.65-0.76', '~0.31', 'High accuracy, weak minority recall'],
          ['XLM-RoBERTa', '~0.51-0.77', '~0.39', 'Strong but overfit under imbalance'],
          ['Zero-shot LLM', '~0.65', '~0.34', 'Exploratory, small sample'],
        ],
        note: "The Linear SVM's 0.486 macro-F1 on the full three-class dataset is the honest headline result, not the transformer's. XLM-RoBERTa reached about 0.77 validation accuracy in one run, but with near-zero hate-speech F1, and the LLM was scored on only a small sample.",
      },
      {
        kind: 'bullets',
        index: '05',
        title: 'What I found',
        items: [
          'The simplest model won: a TF-IDF Linear SVM gave the strongest and most balanced macro-F1 (0.486).',
          'Accuracy hid the real problem. Naive Bayes and some transformer runs looked fine on accuracy while their hate-speech F1 sat near zero.',
          "Multilingual pretraining was not a silver bullet. XLM-RoBERTa's Swahili knowledge did not overcome the imbalance without careful fine-tuning, class weighting, and early stopping.",
          'The hard part was the minority classes: telling offensive from hate speech, and explicit from implicit toxicity, far more than recognizing neutral text.',
          'Better data is the bottleneck. Larger, culturally-informed hate-speech annotation with dialect, slang, and code-switching coverage would help more than a bigger model.',
        ],
      },
      {
        kind: 'tags',
        index: '06',
        title: 'Stack',
        items: ['Python', 'scikit-learn', 'PyTorch', 'Hugging Face', 'XLM-RoBERTa', 'TF-IDF'],
      },
    ],
  },

  arbitra: {
    eyebrow: 'AI · E-commerce',
    title: 'Arbitra',
    summary:
      'An AI product-research platform for Amazon. You describe what you want in plain language and Arbitra returns either ranked product cards with verdicts or a side-by-side comparison table. Claude handles the reasoning while a live Amazon data feed supplies the facts, and it runs as a Turborepo monorepo that also exposes its search and comparison as an MCP server, so agents can shop through it too.',
    meta: [
      { label: 'Frontend', value: 'Next.js 16 · React 19' },
      { label: 'Backend', value: 'Fastify 5 · Prisma' },
      { label: 'AI + data', value: 'Claude · Rainforest' },
      { label: 'Structure', value: 'Turborepo · pnpm' },
    ],
    demo: 'https://arbitraweb-production.up.railway.app/',
    blocks: [
      {
        kind: 'prose',
        index: '01',
        title: 'Overview',
        body: [
          'Arbitra turns a plain-language shopping request into a structured answer. You type what you are looking for and it returns either a ranked set of product cards, each with a verdict, or a side-by-side comparison table, rather than a page of raw listings to sift through yourself.',
          'The intelligence is split deliberately. Claude interprets the query, plans the Amazon search, scores the candidates, and writes the prose, while all the hard facts (prices, specifications, images, and product URLs) come from the Rainforest Amazon data API. Watchlists and saved preferences let research carry over between sessions.',
        ],
      },
      {
        kind: 'gallery',
        index: '02',
        title: 'A look inside',
        images: [
          {
            src: '/arbitra/landing.png',
            alt: 'Arbitra landing page with the headline "Find the best product. With receipts." and a demo search for noise-cancelling headphones showing ranked picks with scores.',
            caption: 'The landing page: describe what you want and get ranked, evidence-backed verdicts.',
          },
          {
            src: '/arbitra/results.png',
            alt: 'A completed Arbitra search for "Yamaha studio monitors under $5000" showing eight Amazon products ranked with scores, verdicts, prices, and specs.',
            caption:
              'A finished search: eight Amazon products ranked with scores and verdicts, over specs and prices pulled live from Rainforest.',
          },
          {
            src: '/arbitra/mcp.png',
            alt: 'A Claude conversation driving the Arbitra MCP server to search and compare Yamaha studio monitors, returning ranked picks and product images.',
            caption: 'The same engine from Claude: searching and comparing through the Arbitra MCP server as tool calls.',
          },
        ],
      },
      {
        kind: 'stages',
        index: '03',
        title: 'How it works',
        flow: ['Interpret', 'Retrieve', 'Score', 'Present'],
        stages: [
          {
            step: '01',
            name: 'Understands the request',
            body: 'Claude parses the natural-language query and plans an Amazon search against one of 13 fixed product categories, whose stable schema keeps results from drifting from one query to the next.',
          },
          {
            step: '02',
            name: 'Retrieves real product data',
            body: 'Candidates are pulled and hydrated through the Rainforest API, which supplies live Amazon prices, specifications, images, and direct URLs. Identity is verified at search and ASIN-hydration time so results point at the right product.',
          },
          {
            step: '03',
            name: 'Scores and explains',
            body: 'Claude scores the hydrated candidates and generates the verdicts and prose, but never touches identity or the underlying facts. The LLM is used for interpretation only, never for factual recovery, so prices and product names stay deterministic.',
          },
          {
            step: '04',
            name: 'Streams the result',
            body: 'Pipeline progress streams to the UI over Server-Sent Events, so the ranked cards or the comparison table fill in live instead of appearing after a long blank wait.',
          },
        ],
        note: 'It is a pnpm and Turborepo monorepo: a Next.js 16 and React 19 frontend (Tailwind v4, shadcn/ui, Zustand), a Fastify 5 API with Prisma over PostgreSQL, and a shared package of TypeScript and Zod types. The frontend deploys on Vercel, with the API and database on Railway.',
      },
      {
        kind: 'prose',
        index: '04',
        title: 'Built for agents',
        body: [
          'Arbitra ships its search, comparison, and price-tracking as a Model Context Protocol server, a dedicated package in the monorepo. An AI assistant can shop through Arbitra directly, running a ranked search, comparing candidates, and managing a watchlist as tool calls against the same backend that powers the web app.',
          'That makes the product usable not just by a person clicking around, but by an agent acting on their behalf, which was a first-class design goal rather than an afterthought.',
        ],
      },
      {
        kind: 'bullets',
        index: '05',
        title: 'Highlights',
        items: [
          'Natural-language search that returns ranked product cards with verdicts or a side-by-side comparison table.',
          'Split-intelligence pipeline: Claude interprets, plans, scores, and writes; Rainforest supplies the hard Amazon facts.',
          'Deterministic identity and pricing: the LLM never touches product names or facts, only interpretation, which rules out hallucinated data.',
          'Thirteen fixed product categories with stable schemas, so results stay consistent instead of drifting per query.',
          'Real-time pipeline progress streamed to the UI over Server-Sent Events.',
          'Exposes a Model Context Protocol server, so AI assistants can search, compare, and track products, not just the web UI.',
        ],
      },
      {
        kind: 'tags',
        index: '06',
        title: 'Stack',
        items: [
          'Next.js 16',
          'React 19',
          'Fastify 5',
          'Prisma',
          'PostgreSQL',
          'Turborepo',
          'Claude',
          'Rainforest',
          'MCP',
        ],
      },
    ],
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

        {(content.demo || content.github) && (
          <div className="mt-6 flex flex-wrap gap-3">
            {content.demo && (
              <a
                href={content.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-sm bg-accent px-4 py-2 text-sm font-medium text-accent-foreground transition hover:brightness-110"
              >
                <span>Visit site</span>
                <ArrowUpRight size={15} aria-hidden="true" />
              </a>
            )}
            {content.github && (
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
            )}
          </div>
        )}
      </ScrollReveal>

      {content.blocks.map((block) => (
        <BlockView key={block.index} block={block} />
      ))}

      <div className="mt-16 pt-8 border-t border-border">
        <BackLink />
      </div>
    </article>
  );
}

function BlockView({ block }: { block: Block }) {
  switch (block.kind) {
    case 'prose':
      return (
        <Section index={block.index} title={block.title}>
          <div className="space-y-4 text-[15px] leading-relaxed text-muted-foreground">
            {block.body.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
        </Section>
      );

    case 'stages':
      return (
        <Section index={block.index} title={block.title}>
          {block.intro && (
            <p className="text-[15px] leading-relaxed text-muted-foreground">{block.intro}</p>
          )}
          {block.flow && (
            <div
              className={`flex flex-wrap items-center gap-2 label-mono text-muted-foreground ${
                block.intro ? 'mt-6' : ''
              }`}
              aria-hidden="true"
            >
              {block.flow.map((f, i) => (
                <span key={f} className="flex items-center gap-2">
                  <span className="border border-border rounded-sm px-3 py-1 text-foreground">{f}</span>
                  {i < block.flow!.length - 1 && <span className="text-accent">→</span>}
                </span>
              ))}
            </div>
          )}

          <StaggerContainer className="mt-8 border-t border-border">
            {block.stages.map((stage) => (
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

          {block.note && (
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground/90">{block.note}</p>
          )}
        </Section>
      );

    case 'bullets':
      return (
        <Section index={block.index} title={block.title}>
          <ul className="space-y-3">
            {block.items.map((h) => (
              <li key={h} className="flex gap-3 text-[15px] leading-relaxed text-muted-foreground">
                <span
                  className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                  aria-hidden="true"
                />
                <span>{h}</span>
              </li>
            ))}
          </ul>
        </Section>
      );

    case 'code':
      return (
        <Section index={block.index} title={block.title}>
          {block.intro && (
            <p className="text-[15px] leading-relaxed text-muted-foreground">{block.intro}</p>
          )}
          <div
            className={`overflow-x-auto border border-border rounded-sm bg-card ${
              block.intro ? 'mt-5' : ''
            }`}
          >
            <pre className="p-5 text-[13px] leading-relaxed font-mono text-foreground">
              <code>{block.code}</code>
            </pre>
          </div>
        </Section>
      );

    case 'table':
      return (
        <Section index={block.index} title={block.title}>
          {block.intro && (
            <p className="text-[15px] leading-relaxed text-muted-foreground">{block.intro}</p>
          )}
          <div
            className={`overflow-x-auto border border-border rounded-sm ${block.intro ? 'mt-5' : ''}`}
          >
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-border">
                  {block.columns.map((c) => (
                    <th
                      key={c}
                      className="label-mono text-muted-foreground/70 font-normal text-left px-4 py-3 whitespace-nowrap"
                    >
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {block.rows.map((row, ri) => (
                  <tr key={ri} className="border-b border-border last:border-b-0">
                    {row.map((cell, ci) => (
                      <td
                        key={ci}
                        className={`px-4 py-3 align-top ${
                          ci === 0
                            ? 'text-foreground font-medium'
                            : block.monoCols?.includes(ci)
                              ? 'text-muted-foreground font-mono whitespace-nowrap'
                              : 'text-muted-foreground'
                        }`}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {block.note && (
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground/90">{block.note}</p>
          )}
        </Section>
      );

    case 'gallery':
      return <Gallery block={block} />;

    case 'tags':
      return (
        <Section index={block.index} title={block.title}>
          <div className="flex flex-wrap gap-2">
            {block.items.map((t) => (
              <span
                key={t}
                className="font-mono text-[12px] text-muted-foreground border border-border rounded-sm px-2.5 py-1"
              >
                {t}
              </span>
            ))}
          </div>
        </Section>
      );
  }
}

function Gallery({ block }: { block: Extract<Block, { kind: 'gallery' }> }) {
  const [active, setActive] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActive(null);
    };
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [active]);

  const current = active === null ? null : block.images[active];

  return (
    <Section index={block.index} title={block.title}>
      <div className="space-y-8">
        {block.images.map((img, i) => (
          <figure key={img.src}>
            <button
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Expand image: ${img.caption}`}
              className="group block w-full overflow-hidden border border-border rounded-sm bg-card cursor-zoom-in transition-colors hover:border-accent/60"
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="block w-full h-auto transition-transform duration-300 group-hover:scale-[1.01]"
                onError={(e) => {
                  // Until the screenshot files are added, hide the figure rather
                  // than show a broken-image icon.
                  const figure = e.currentTarget.closest('figure');
                  if (figure) figure.style.display = 'none';
                }}
              />
            </button>
            <figcaption className="mt-3 text-sm text-muted-foreground">{img.caption}</figcaption>
          </figure>
        ))}
      </div>

      {current && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={current.caption}
          onClick={() => setActive(null)}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-4 bg-background/95 backdrop-blur-sm p-4 sm:p-8"
        >
          <button
            ref={closeRef}
            type="button"
            onClick={() => setActive(null)}
            aria-label="Close full-screen image"
            className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center border border-border rounded-sm text-foreground transition-colors hover:border-accent hover:text-accent"
          >
            <X size={18} aria-hidden="true" />
          </button>
          <img
            src={current.src}
            alt={current.alt}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[85vh] max-w-full w-auto object-contain border border-border rounded-sm"
          />
          <p className="max-w-2xl text-center text-sm text-muted-foreground">{current.caption}</p>
        </div>
      )}
    </Section>
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
