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
      'A search engine I wrote from scratch in C, in 3 parts: a crawler that downloads a bounded set of web pages, an indexer that builds an inverted index from them, and a querier that answers ranked Boolean searches against that index.',
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
          'I built the whole pipeline in C, with no framework underneath it. Each stage is its own command-line program that reads the previous stage’s output, so I could build and test the crawler, indexer, and querier separately.',
          'It runs on 4 data structures I wrote by hand (a hashtable, set, counters, and bag), which keep lookups and de-duplication fast without pulling in any dependencies. Memory is managed manually throughout, and I leaned on Valgrind to keep it leak-free.',
          'I also added a local demo so it runs without any external server: one script serves a bundled test site, crawls it, builds the index, and opens the querier.',
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
            body: 'Starts at a seed URL and walks outward breadth-first, up to a depth I can set from 0 to 10. It stays inside one allowed domain, de-duplicates every URL it finds, and saves each page (its URL, depth, and raw HTML) to a directory for the next stage.',
          },
          {
            step: '02',
            name: 'Indexer',
            body: 'Reads the saved pages, pulls out words (lowercased, at least 3 letters), and builds an inverted index: for each word, which documents contain it and how often. It writes the index to a file so it can be reloaded and checked on its own.',
          },
          {
            step: '03',
            name: 'Querier',
            body: 'Loads the index and answers Boolean queries with “and” and “or”, where “and” binds tighter. It scores matches (an “and” sequence by its smallest count, “or” by the sum) and prints them ranked by score with their URLs.',
          },
        ],
        note: 'A shared common layer holds the page-directory, index, and word-normalization helpers the 3 programs all use, on top of libengine, my small library of data structures and web helpers (hashtable, set, counters, bag, webpage).',
      },
      {
        kind: 'bullets',
        index: '03',
        title: 'Engineering highlights',
        items: [
          'Breadth-first crawl that stays on one domain, respects a depth limit, and de-duplicates URLs; I later tuned it to crawl faster.',
          'Inverted index backed by hashtable lookups that stay fast as the index grows.',
          'A query parser that handles “and”/“or” precedence and ranks the results.',
          'Runs offline from one command: the script serves a bundled site, crawls, indexes, and opens the querier.',
          'Helper scripts that mirror any static site locally, so I can crawl real pages without a server.',
          '3 small programs over one shared library, with manual memory management and error handling throughout.',
        ],
      },
      {
        kind: 'code',
        index: '04',
        title: 'Build & run',
        intro:
          'One make build, and it runs offline. A single script serves a bundled test site and takes it through the whole pipeline, or I can run each stage by hand:',
        code: `# one command: serve a bundled test site, then crawl, index, and query
./run.sh                 # crawl the bundled 9-page "bigsite" at depth 2
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
      'An end-to-end encrypted messaging app built around RSA key pairs, database-enforced access controls, and moderation workflows for flagged content.',
    meta: [
      { label: 'Frontend', value: 'React · TypeScript' },
      { label: 'Backend', value: 'Supabase · Postgres' },
      { label: 'Encryption', value: 'RSA-2048' },
      { label: 'Access', value: 'RBAC + RLS' },
    ],
    github: 'https://github.com/ChikwandaChisha/CryptNote',
    demo: 'https://crypt-note-rust.vercel.app/',
    blocks: [
      {
        kind: 'prose',
        index: '01',
        title: 'Overview',
        body: [
          'CryptNote is an end-to-end encrypted messaging app where each message is encrypted before it ever reaches the server. Every user gets an RSA key pair, and the private key stays on the device.',
          'The application also models moderation and safety controls directly in the data layer. Users, moderators, and admins each have different permissions, and those rules are enforced with PostgreSQL row-level security rather than only in the UI.',
          'I built the experience around privacy-first messaging, with moderation tools for reviewing and freezing flagged content without exposing message contents to the wrong audience.',
        ],
      },
      {
        kind: 'stages',
        index: '02',
        title: 'Architecture',
        flow: ['Encrypt', 'Authorize', 'Moderate'],
        stages: [
          {
            step: '01',
            name: 'End-to-end encryption',
            body: 'Public keys are stored in the database so messages can be encrypted for the intended recipient, while the private key remains local and never leaves the device.',
          },
          {
            step: '02',
            name: 'Access control',
            body: 'Role-based access control is enforced with PostgreSQL row-level security so the database itself controls who can read or write which rows.',
          },
          {
            step: '03',
            name: 'Moderation workflow',
            body: 'Flagged content can be reviewed by moderators, and sensitive actions are logged so the system maintains accountability without exposing message contents.',
          },
        ],
        note: 'Supabase handles auth and real-time delivery, while React Query manages the client-side data flow and the backend rules are enforced in the database.',
      },
      {
        kind: 'gallery',
        index: '03',
        title: 'A look inside',
        images: [
          {
            src: '/cryptnote/Screenshot 2026-08-05 154916.png',
            alt: 'CryptNote security model diagram showing encryption, role-based access control, and audit logging as connected layers.',
            caption: 'The security model: encryption, role-based access control, and audit logging working together.',
          },
          {
            src: '/cryptnote/Screenshot 2026-08-05 154815.png',
            alt: 'CryptNote moderation dashboard with flagged content cards and controls for reviewing, freezing, and acting on messages.',
            caption: 'The moderator workflow: review flagged content, manage tokens, and keep abuse under control.',
          },
          {
            src: '/cryptnote/Screenshot 2026-08-05 154438.png',
            alt: 'CryptNote chat interface showing an encrypted conversation thread with a secure message view and privacy-focused UI elements.',
            caption: 'The messaging experience: encrypted conversations with a calm, privacy-first interface.',
          },
        ],
      },
      {
        kind: 'bullets',
        index: '04',
        title: 'Engineering highlights',
        items: [
          'RSA-based encryption with per-user key pairs and device-only private keys.',
          'Database-enforced role-based access control through PostgreSQL row-level security.',
          'Moderation tools for flagging, reviewing, and freezing abusive content.',
          'A privacy-first architecture that keeps plaintext out of the server-side workflow.',
        ],
      },
      {
        kind: 'code',
        index: '05',
        title: 'Build & run',
        intro:
          'The frontend is a Vite and React app and Supabase handles the backend, so the local setup is just install and start:',
        code: `# clone and install
git clone https://github.com/ChikwandaChisha/CryptNote
cd CryptNote
npm install

# start the dev server
npm run dev`,
      },
      {
        kind: 'tags',
        index: '06',
        title: 'Stack',
        items: ['React', 'TypeScript', 'Supabase', 'PostgreSQL', 'Tailwind CSS', 'RSA'],
      },
    ],
  },

  'swahili-toxicity-detection': {
    eyebrow: 'AI · ML',
    title: 'Swahili Toxicity Detection',
    summary:
      'A 3-class Swahili toxicity classifier (neutral, offensive, hate speech) I built on 48,000+ annotated tweets. I compared a TF-IDF SVM and Naive Bayes against a multilingual transformer and a zero-shot LLM. The Linear SVM came out on top at 0.486 macro-F1, and the error analysis kept pointing back to the same thing: the class imbalance is what made offensive and hate speech hard for every model.',
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
          'Content moderation works a lot better in English than in lower-resource African languages like Swahili, where slang, code-switching, odd spellings, and cultural context trip up English-trained models. I wanted to see how well different approaches could classify Swahili social-media posts as neutral, offensive, or hate speech.',
          'The real question was which of 3 very different approaches (classic machine learning, a multilingual transformer, and an LLM) held up on the rare classes that matter most, not just on the easy neutral majority.',
        ],
      },
      {
        kind: 'table',
        index: '02',
        title: 'Dataset & the imbalance problem',
        intro:
          'I used the HateSpeech_Kenya dataset: over 48,000 Swahili and Swahili-English tweets. Each tweet was labeled by at least 3 annotators, with the majority vote as the final label (0 neutral, 1 offensive, 2 hate speech).',
        columns: ['Class', 'Tweets', 'Share'],
        monoCols: [1, 2],
        rows: [
          ['Neutral / neither', '36,300+', '~75%'],
          ['Offensive', '8,543', '~18%'],
          ['Hate speech', '3,181', '~7%'],
        ],
        note: 'About 75% of the data is neutral and under 7% is hate speech, so a model can hit over 70% accuracy while barely catching any toxicity. That is why I leaned on macro-F1, which weights all 3 classes equally, instead of accuracy.',
      },
      {
        kind: 'stages',
        index: '03',
        title: 'Approach',
        intro:
          'I cleaned each tweet of social-media noise (usernames, URLs, numbers, non-letter characters), lowercased it for the classic models, and dropped it if it was too short. Then I split the data 80/20 with stratified sampling so the class ratios held in both sets, and compared 4 model families:',
        flow: ['Clean', 'Lowercase', 'Filter', 'Stratified 80/20'],
        stages: [
          {
            step: '01',
            name: 'TF-IDF + Linear SVM',
            body: 'TF-IDF features (about 5,000 terms) into a LinearSVC with class weighting. This was the most balanced model I trained, and the one I ended up trusting most.',
          },
          {
            step: '02',
            name: 'Multinomial Naive Bayes',
            body: 'A quick probabilistic baseline on the same features. It scored well on accuracy in some runs, but leaned hard on the neutral class and almost never caught hate speech.',
          },
          {
            step: '03',
            name: 'XLM-RoBERTa',
            body: 'A multilingual transformer I fine-tuned for the 3 classes, with up to 10 epochs, early stopping, and some class-weighting experiments. I expected its multilingual pretraining to help with Swahili, but it was sensitive to the imbalance and overfit easily.',
          },
          {
            step: '04',
            name: 'Zero-shot LLM',
            body: 'A GPT-style model prompted to label a tweet with no training of its own. I treated it as an exploratory baseline and only ran it on a small sample, because of API and cost limits.',
          },
        ],
      },
      {
        kind: 'table',
        index: '04',
        title: 'Results',
        intro:
          'These numbers came from several runs and configurations, so I read them as a comparison rather than one clean benchmark.',
        columns: ['Model', 'Accuracy', 'Macro-F1', 'Notes'],
        monoCols: [1, 2],
        rows: [
          ['TF-IDF + Linear SVM', '~0.70', '0.486', 'Best balanced result'],
          ['Multinomial Naive Bayes', '~0.65-0.76', '~0.31', 'High accuracy, weak minority recall'],
          ['XLM-RoBERTa', '~0.51-0.77', '~0.39', 'Strong but overfit under imbalance'],
          ['Zero-shot LLM', '~0.65', '~0.34', 'Exploratory, small sample'],
        ],
        note: 'The honest headline is the Linear SVM at 0.486 macro-F1 on the full 3-class set, not the transformer. XLM-RoBERTa did hit about 0.77 validation accuracy in one run, but its hate-speech F1 was near zero, and the LLM only saw a small sample.',
      },
      {
        kind: 'bullets',
        index: '05',
        title: 'What I found',
        items: [
          'The simplest model won. The TF-IDF SVM gave the best, most balanced macro-F1 (0.486), with per-class F1 of 0.82 neutral, 0.32 offensive, and 0.32 hate speech.',
          'Accuracy hid the real problem: Naive Bayes and some transformer runs looked fine on accuracy while their hate-speech F1 sat near zero (Naive Bayes scored about 0.02).',
          'Multilingual pretraining was not a shortcut. XLM-RoBERTa knew some Swahili, but it did not beat the imbalance without careful fine-tuning, class weighting, and early stopping.',
          'The hard part was the minority classes, mostly telling offensive from hate speech and explicit from implicit toxicity. Recognizing neutral text was never the issue.',
          'The real bottleneck is data. More hate-speech examples, annotated with cultural context and covering dialect, slang, and code-switching, would help more than a bigger model.',
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
      'An AI product-research tool for Amazon. You describe what you want in plain language and get back either ranked product cards with a verdict on each, or a side-by-side comparison. Claude does the reasoning and a live Amazon feed supplies the facts. It is a Turborepo monorepo, and it also exposes its search and comparison over MCP, so an agent can shop through it, not just a person.',
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
          'Arbitra takes a plain-language shopping request and gives back a structured answer. You type what you want, and instead of a wall of listings you get either ranked product cards, each with a verdict, or a side-by-side comparison.',
          'I split the work on purpose. Claude reads the query, plans the search, scores the candidates, and writes the summaries, while the hard facts (prices, specs, images, product links) all come from the Rainforest Amazon API. Watchlists and saved preferences carry research over between sessions.',
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
            alt: 'A completed Arbitra search for "Yamaha studio monitors under $5000" showing 8 Amazon products ranked with scores, verdicts, prices, and specs.',
            caption:
              'A finished search: 8 Amazon products ranked with scores and verdicts, over specs and prices pulled live from Rainforest.',
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
            body: 'Claude reads the query and plans an Amazon search against one of 13 fixed categories. The fixed schema keeps results from drifting between similar queries.',
          },
          {
            step: '02',
            name: 'Retrieves real product data',
            body: 'Candidates come from the Rainforest API, which gives live Amazon prices, specs, images, and direct links. I verify identity at search time and again when hydrating each ASIN, so a card points at the right product.',
          },
          {
            step: '03',
            name: 'Scores and explains',
            body: 'Claude scores the candidates and writes the verdicts, but it never touches identity or the underlying facts. I keep the LLM to interpretation only, never to recover facts, so prices and product names stay deterministic.',
          },
          {
            step: '04',
            name: 'Streams the result',
            body: 'Progress streams to the UI over Server-Sent Events, so the cards or the comparison fill in live instead of after a long blank wait.',
          },
        ],
        note: 'It is a pnpm and Turborepo monorepo: a Next.js 16 and React 19 frontend (Tailwind v4, shadcn/ui, Zustand), a Fastify 5 API with Prisma over PostgreSQL, and a shared package of TypeScript and Zod types. The frontend runs on Vercel, the API and database on Railway.',
      },
      {
        kind: 'prose',
        index: '04',
        title: 'Built for agents',
        body: [
          'Arbitra also ships its search, comparison, and price tracking as a Model Context Protocol server, a separate package in the monorepo. An assistant can shop through it directly, running a search, comparing candidates, and updating a watchlist as tool calls against the same backend as the web app.',
          'So a person can click through the site, or an agent can do the same work through the API. I wanted both to be first-class from the start.',
        ],
      },
      {
        kind: 'bullets',
        index: '05',
        title: 'Highlights',
        items: [
          'Natural-language search that returns ranked cards with verdicts, or a side-by-side comparison.',
          'Claude handles interpretation, planning, scoring, and writing; Rainforest supplies the Amazon facts.',
          'The LLM never touches product names, prices, or identity, only interpretation, which keeps hallucinated data out.',
          '13 fixed categories with stable schemas, so results stay consistent between similar queries.',
          'Live progress streamed to the UI over Server-Sent Events.',
          'An MCP server so assistants can search, compare, and track products, not just the web UI.',
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

  soundswipe: {
    eyebrow: 'Mobile',
    title: 'SoundSwipe',
    summary:
      'A music-discovery app built around swiping. You flick through 30-second Apple Music previews to skip or save a track, tap a card to see artist context, and the recommendations adapt as you go. I built it in React Native, with a physics-based swipe deck and a hidden WebView bridge to Apple MusicKit.',
    meta: [
      { label: 'Platform', value: 'React Native · Expo' },
      { label: 'Music', value: 'Apple MusicKit' },
      { label: 'Auth', value: 'Firebase' },
      { label: 'Backend', value: 'Express · Firestore' },
    ],
    blocks: [
      {
        kind: 'prose',
        index: '01',
        title: 'Overview',
        body: [
          'Discovery on the big streaming apps is passive. Radio plays songs at you, but actually catching the good ones is a chore, and the moment you like a track is a few taps away from saving it.',
          'SoundSwipe puts discover, sample, and sort into one set of gestures. Swipe left to skip, right to drop a song into a playlist, up or down to move through the queue, and tap to flip the card for artist context. Every swipe feeds the recommender, which adjusts during the session.',
        ],
      },
      {
        kind: 'stages',
        index: '02',
        title: 'The swipe deck',
        intro:
          'The feed is the part I spent the most time on: a direction-locked, physics-based swipe card built with gesture-handler and Reanimated.',
        flow: ['Discover', 'Sample', 'Sort'],
        stages: [
          {
            step: '01',
            name: 'Direction-locked gestures',
            body: 'The pan gesture locks to one axis based on which threshold it crosses first (about 30 px sideways or 60 px up or down), so a card does not wobble diagonally. A horizontal swipe rotates the card and shifts its background from red for skip, through white, to green for save; a vertical swipe pages through the queue.',
          },
          {
            step: '02',
            name: 'Gesture to intent',
            body: 'Swipe right opens a playlist picker and records a like, swipe left skips and records a dislike, and up or down moves between songs. Tapping the card flips it in 3D to show the album and an AI-written artist description.',
          },
          {
            step: '03',
            name: 'A loop that learns',
            body: 'Every like and dislike goes back to the session, and as the queue runs low the deck fetches the next batch of recommendations ahead of time, so it keeps adapting and does not stall.',
          },
          {
            step: '04',
            name: 'Continuous playback',
            body: '30-second previews stream from the Apple Music catalog and play automatically. A timer moves to the next track when a preview ends, so the deck plays like a radio station, and a 12-bar waveform animates while a track is playing.',
          },
        ],
        note: 'Reanimated keeps the animation on the UI thread while state updates run on the JS thread through runOnJS, so the deck stays smooth even when you swipe quickly.',
      },
      {
        kind: 'prose',
        index: '03',
        title: 'Architecture',
        body: [
          'The client is a React Native and Expo app (Expo SDK 52) with a 4-screen navigation stack (login, profile, create-search, and the feed), and Firebase handles email and password auth. An Express API on Render sits behind it, keeping users and search sessions in Firestore and calling an LLM service for recommendations, feedback, and artist descriptions.',
          'Apple Music was the hard part, because there is no native React Native SDK for MusicKit. So I embed an invisible 0-by-0 WebView that loads MusicKit JS from Apple and talks to React Native over postMessage. The handshake goes: the WebView says it is ready, React Native fetches a signed developer token from the backend and sends a configure message, the WebView configures MusicKit and authorizes, and the user token is saved to Firestore. I wrapped the whole thing in a React Context so any screen can start authorization.',
        ],
      },
      {
        kind: 'bullets',
        index: '04',
        title: 'Engineering challenges',
        items: [
          'Fixed an overplay bug where fast swiping left several previews playing at once. Each card unloads its sound before loading the next and again on unmount, which is the lifecycle-correct way to handle audio in React.',
          'Bridged Apple MusicKit through a hidden WebView, with a ready handshake and a 500 ms guard so the WebView load and the token fetch do not race.',
          'Kept the deck from stalling by pre-fetching the next batch of songs before the queue runs out.',
          'Made the login screen keyboard-aware: the title shrinks and the layout shifts when the keyboard opens.',
          'Kept gestures smooth by running the animations on the UI thread with Reanimated and syncing state on the JS thread.',
        ],
      },
      {
        kind: 'tags',
        index: '05',
        title: 'Stack',
        items: ['React Native', 'Expo', 'Reanimated', 'Apple MusicKit', 'Firebase', 'Firestore', 'Express'],
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
