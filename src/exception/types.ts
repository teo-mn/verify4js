interface ChainPointSchema {
  targetHash: string;
  merkleRoot: string;
  type: string;
  context: string;
  anchors: AnchorSchema[];
  proof: ProofSchema[];
}

interface AnchorSchema {
  sourceId: string;
  type: string;
}

interface ProofSchema {
  left: string;
  right: string;
}
