const SunnySvg = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={40}
    height={40}
    fill="none"
    {...props}
  >
    <g clipPath="url(#a)">
      <path
        stroke="#fff"
        strokeLinecap="round"
        strokeWidth={2}
        d="M20 35v1.667M35 20h1.667M20 5V3.333M5 20H3.333M30.833 30.833l.834.834m-.834-22.5.834-.834m-22.5.834-.834-.834m.834 22.5-.834.834"
      />
      <mask
        id="b"
        width={42}
        height={42}
        x={0}
        y={-2}
        maskUnits="userSpaceOnUse"
        style={{
          maskType: "luminance",
        }}
      >
        <path
          fill="#fff"
          d="M20 40c11.046 0 20-8.954 20-20S31.046 0 20 0 0 8.954 0 20s8.954 20 20 20Z"
        />
        <path
          fill="#000"
          d="M20 26.667a6.667 6.667 0 1 0 0-13.334 6.667 6.667 0 0 0 0 13.334Z"
        />
        <path fill="#fff" d="M36.667 8.333a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z" />
        <path
          fill="#000"
          d="M36.667 5a1.667 1.667 0 1 0 0-3.333 1.667 1.667 0 0 0 0 3.333Z"
        />
      </mask>
      <g mask="url(#b)">
        <path
          fill="#fff"
          d="M20 30c5.523 0 10-4.477 10-10s-4.477-10-10-10-10 4.477-10 10 4.477 10 10 10Z"
        />
      </g>
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h40v40H0z" />
      </clipPath>
    </defs>
  </svg>
)
export default SunnySvg
