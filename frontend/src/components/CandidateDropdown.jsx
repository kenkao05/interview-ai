export default function CandidateDropdown({ candidates, onSelect, selected }) {
  return (
    <select
      className="border-2 border-gold rounded-full bg-white/70 backdrop-blur-md px-5 py-3 text-ink shadow-sm text-lg w-full max-w-md"
      value={selected?.member?.id || ""}
      onChange={(e) => {
        const c = candidates.find((c) => c.member.id === e.target.value);
        onSelect(c);
      }}
    >
      <option value="" disabled>
        Select a candidate to interview
      </option>
      {candidates.map((c) => (
        <option key={c.member.id} value={c.member.id}>
          {c.member.name} — {c.member.jobRole}
        </option>
      ))}
    </select>
  );
}