const tag = process.env.GITHUB_REF_NAME;

if (!tag) {
  throw new Error("GITHUB_REF_NAME is missing");
}

const match =
  /^([a-z0-9-]+)@([0-9]+\.[0-9]+\.[0-9]+(?:[-.][0-9A-Za-z.-]+)?)$/.exec(tag);

if (!match) {
  throw new Error(
    `Expected tag format: package-name@version (for example, walker-core@1.7.0). Got: ${tag}`,
  );
}

const [, packageName, version] = match;
const manifestPath = `packages/${packageName}/package.json`;
const manifestFile = Bun.file(manifestPath);

if (!(await manifestFile.exists())) {
  throw new Error(`No package found at ${manifestPath}`);
}

const manifest = await manifestFile.json();

if (manifest.name !== packageName) {
  throw new Error(
    `Tag package '${packageName}' does not match manifest name '${manifest.name}'`,
  );
}

if (manifest.version !== version) {
  throw new Error(
    `Tag version '${version}' does not match package version '${manifest.version}'`,
  );
}

if (manifest.private) {
  throw new Error(`Refusing to publish private package '${packageName}'`);
}

console.log(`name=${packageName}`);
console.log(`version=${version}`);

export {};
