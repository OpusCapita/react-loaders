node_version() {
    echo -e "\n[INFO] ================================================================================================="
    echo "[INFO] NodeJS: Updating to release version: $1."
    echo "[INFO] ================================================================================================="
    find . -maxdepth 1 -type f -name "package.json" -exec sed -i 's|\"version.*\"|\"version\": \"'$1'\"|g' {} \;
    git --no-pager diff --color
}