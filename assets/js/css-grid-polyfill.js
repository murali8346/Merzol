/**
 * CSS Grid Layout Polyfill for IE11 and older browsers
 * This script provides basic CSS Grid support for older browsers
 * Based on a simplified version of css-grid-polyfill
 */

(function() {
    // Only run in browsers that don't support CSS Grid
    if (window.CSS && CSS.supports && CSS.supports('display', 'grid')) {
        return;
    }
    
    // Check if we're in IE or an older browser
    const isIE = /*@cc_on!@*/false || !!document.documentMode;
    const isOldEdge = !isIE && !!window.StyleMedia;
    
    if (!isIE && !isOldEdge) {
        return; // Only apply to IE and old Edge
    }
    
    // Find all grid containers
    function findGridContainers() {
        const allElements = document.querySelectorAll('*');
        const gridContainers = [];
        
        for (let i = 0; i < allElements.length; i++) {
            const el = allElements[i];
            const style = window.getComputedStyle(el);
            
            if (style.display === 'grid' || style.display === '-ms-grid') {
                gridContainers.push(el);
            }
        }
        
        return gridContainers;
    }
    
    // Apply basic grid layout to a container
    function applyGridLayout(container) {
        const style = window.getComputedStyle(container);
        const children = container.children;
        
        // Set container style
        container.style.display = '-ms-grid';
        
        // Try to determine grid columns and rows
        let columns = style.gridTemplateColumns || '1fr';
        let rows = style.gridTemplateRows || '1fr';
        
        // Convert to -ms-grid format
        columns = columns.replace(/repeat\((\d+),\s*([^)]+)\)/g, function(match, count, value) {
            let result = '';
            for (let i = 0; i < parseInt(count); i++) {
                result += value + ' ';
            }
            return result.trim();
        });
        
        rows = rows.replace(/repeat\((\d+),\s*([^)]+)\)/g, function(match, count, value) {
            let result = '';
            for (let i = 0; i < parseInt(count); i++) {
                result += value + ' ';
            }
            return result.trim();
        });
        
        // Apply to container
        container.style.msGridColumns = columns;
        container.style.msGridRows = rows;
        
        // Process children
        for (let i = 0; i < children.length; i++) {
            const child = children[i];
            const childStyle = window.getComputedStyle(child);
            
            // Get grid area or position
            const gridArea = childStyle.gridArea;
            const gridColumn = childStyle.gridColumn || childStyle.gridColumnStart;
            const gridRow = childStyle.gridRow || childStyle.gridRowStart;
            
            if (gridArea && gridArea !== 'auto / auto / auto / auto') {
                // Parse grid-area
                const areaParts = gridArea.split('/');
                if (areaParts.length === 4) {
                    const rowStart = parseInt(areaParts[0]) || 1;
                    const colStart = parseInt(areaParts[1]) || 1;
                    
                    child.style.msGridRow = rowStart;
                    child.style.msGridColumn = colStart;
                }
            } else if (gridColumn || gridRow) {
                // Parse individual grid-column/grid-row
                if (gridColumn) {
                    const colValue = parseInt(gridColumn) || 1;
                    child.style.msGridColumn = colValue;
                }
                
                if (gridRow) {
                    const rowValue = parseInt(gridRow) || 1;
                    child.style.msGridRow = rowValue;
                }
            }
            
            // Handle alignment
            if (childStyle.justifySelf === 'center') {
                child.style.msGridColumnAlign = 'center';
            } else if (childStyle.justifySelf === 'end') {
                child.style.msGridColumnAlign = 'end';
            }
            
            if (childStyle.alignSelf === 'center') {
                child.style.msGridRowAlign = 'center';
            } else if (childStyle.alignSelf === 'end') {
                child.style.msGridRowAlign = 'end';
            }
        }
    }
    
    // Apply the polyfill
    function applyPolyfill() {
        const gridContainers = findGridContainers();
        
        for (let i = 0; i < gridContainers.length; i++) {
            applyGridLayout(gridContainers[i]);
        }
    }
    
    // Run on load and resize
    window.addEventListener('load', applyPolyfill);
    window.addEventListener('resize', applyPolyfill);
    
    // Also run now in case DOM is already loaded
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        setTimeout(applyPolyfill, 1);
    }
})();