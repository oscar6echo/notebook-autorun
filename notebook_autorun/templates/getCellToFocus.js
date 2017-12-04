

function getCellToFocus(nbCells, focus) {

	focus = parseInt(focus);
	focus = focus >= 0 ? focus : transformNegativeIndex(focus, nbCells);
	return focus;
}

function transformNegativeIndex(negIndex, nbCells) {
	return nbCells.length + negIndex;
}
