import react from "@vitejs/plugin-react-swc";
import { basename } from "path";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	base: "/Blog/",
});
