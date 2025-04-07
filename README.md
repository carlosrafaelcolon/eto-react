# ETO React Playground

This is a personal project where I explore and recreate patterns and components used by the [Emerging Technology Observatory](https://eto.tech) web platform.

The goal of this repo is to:
- Familiarize myself with the frontend architecture and tooling used by ETO
- Experiment with alternative approaches (e.g., recreating charts using D3 instead of react-plotly)
- Explore and visualize data from ETO AGORA (AI Governance and Regulatory Archive)

This is not a production-ready application, but rather a sandbox for technical learning and experimentation.

## Notes

This project is **unaffiliated** with ETO and intended purely for educational purposes.

## Getting Started

To run the project locally:

```bash
npm install
npm run dev
```

Make sure you have [Node.js](https://nodejs.org/) installed.

## **@react-spring/web Peer Dependency Conflict (No Support Yet for React 19)**

The current version of `@react-spring/web` (`9.7.5`) does not officially support React 19. This is due to a peer dependency conflict, as the library only supports React versions `^16.8.0 || ^17.0.0 || ^18.0.0`.

#### **Relevant Issues and Pull Requests**
- [React 19 Support Issue #2341](https://github.com/pmndrs/react-spring/issues/2341): Tracks the community's request for React 19 support.
- [React 19 Upgrade Pull Request #2363](https://github.com/pmndrs/react-spring/pull/2363): A PR that introduces React 19 compatibility. This PR is currently under review and awaiting approval from the maintainers.

#### **Current Workaround**
To use `@react-spring/web` with React 19, you can bypass the peer dependency checks during installation. This allows the library to be installed despite the version mismatch:

```bash
npm install @react-spring/web@9.7.5 --legacy-peer-deps
```

#### **Next Steps**
- Monitor the progress of [PR #2363](https://github.com/pmndrs/react-spring/pull/2363) for updates on React 19 support.
- Once the PR is merged and a new version is released, update the library to the latest version and remove the `--legacy-peer-deps` flag from the installation process.