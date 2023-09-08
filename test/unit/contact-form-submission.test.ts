import { describe, it, expect } from 'vitest';
import { ContactMessageParser } from '../../src/common/contact';

describe('Contact', () => {
	describe('Value Valiadator', () => {
		const values = {
			name: 'Wendy',
			email: 'wendy2000@gmail.com',
			message:
				'Wendy is here to test cause the number of characters must be long enough',
		};
		it('should attest all values are valid', () => {
			expect(
				ContactMessageParser.of(values).allValueIsValid().status
			).toBe('clean');
		});
		it.each(['', ' '])(
			'should attest all values are valid except when name = "%s"',
			(name) => {
				expect(
					ContactMessageParser.of({
						...values,
						name,
					}).allValueIsValid().status
				).toBe('error');
			}
		);
		it.each(['', ' ', 'wendy@g'])(
			'should attest all values are valid except when email = "%s"',
			(email) => {
				expect(
					ContactMessageParser.of({
						...values,
						email,
					}).allValueIsValid().status
				).toBe('error');
			}
		);
		it.each(['', ' '])(
			'should attest all values are valid except when message = "%s"',
			(message) => {
				expect(
					ContactMessageParser.of({
						...values,
						message,
					}).allValueIsValid().status
				).toBe('error');
			}
		);
	});
});
