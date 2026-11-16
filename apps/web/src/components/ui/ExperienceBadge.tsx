"use client";

type ExperienceBadgeProps = {
  value?: string;
  label?: string;
  className?: string;
};

export function ExperienceBadge({
  value = "20+",
  label = "YEARS OF EXPERIENCE",
  className = "",
}: ExperienceBadgeProps) {
  const ringText = `${label} • ${label} • `;

  return (
    <div
      className={`experience-badge relative flex h-[7.5rem] w-[7.5rem] items-center justify-center rounded-full bg-[var(--accent)] shadow-[0_0_0_8px_rgba(201,217,108,0.18),0_18px_40px_rgba(0,0,0,0.22)] md:h-[8.75rem] md:w-[8.75rem] ${className}`}
      aria-label={`${value} ${label.toLowerCase()}`}
    >
      <div className="experience-badge-spin absolute inset-0">
        <svg viewBox="0 0 100 100" className="h-full w-full overflow-visible">
          <defs>
            <path
              id="experience-circle-path"
              d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
            />
          </defs>
          <text
            fill="#1b2e29"
            fontSize="6.4"
            fontWeight="700"
            letterSpacing="1.6"
            style={{ textTransform: "uppercase" }}
          >
            <textPath href="#experience-circle-path" xlinkHref="#experience-circle-path">
              {ringText}
            </textPath>
          </text>
        </svg>
      </div>

      <span className="display relative z-10 text-3xl leading-none text-[#1b2e29] md:text-4xl">
        {value}
      </span>
    </div>
  );
}
