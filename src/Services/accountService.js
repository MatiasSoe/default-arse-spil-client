// register og login
const userRepository = require('../Repositories/userRepository');
const passwordHasher = require('../utils/passwordHasher');
const AppError = require('../utils/AppError');

const toSafeUser = (user) => ({
    id: user._id,
    username: user.username,
    email: user.email,
    imageUrl: user.imageUrl,
    description: user.description ?? ''
});

exports.register = async ({ username, email, password }) => {
    const normalizedEmail = email.trim().toLowerCase();

    const existingUser = await userRepository.getUserByEmail(normalizedEmail);
    if (existingUser) {
        throw new AppError('Der findes allerede en bruger med denne email', 409);
    }

    const hashedPassword = await passwordHasher.hashPassword(password);

    const newUser = await userRepository.createUser({
        username: username.trim(),
        email: normalizedEmail,
        password: hashedPassword
    });

    if (!newUser) {
        throw new AppError('Brugeren kunne ikke oprettes', 500);
    }

    return toSafeUser(newUser);
};

exports.login = async ({ email, password }) => {
    const normalizedEmail = email.trim().toLowerCase();

    const user = await userRepository.getUserByEmailWithPassword(normalizedEmail);

    // Returnér samme fejl ved ukendt email og forkert password (forhindrer user enumeration)
    if (!user) {
        throw new AppError('Ugyldig email eller adgangskode', 401);
    }

    const isPasswordValid = await passwordHasher.comparePassword(password, user.password);
    if (!isPasswordValid) {
        throw new AppError('Ugyldig email eller adgangskode', 401);
    }

    return toSafeUser(user);
};

exports.getAuthenticatedUser = async (userId) => {
    const user = await userRepository.getUserById(userId);
    if (!user) {
        throw new AppError('Brugeren findes ikke længere', 401);
    }

    return toSafeUser(user);
};








